"""Serve smallCards at http://localhost:5502 together with its deal library folder.

A web page cannot list a folder, so this server does it for the Deal Library drop-down:
    /<folder name>/         JSON: {"folder": ..., "found": true/false, "files": [library .js files]}
    /<folder name>/<file>   a library file from the folder
Everything else is served from the smallCards folder.

The folder is DEFAULT_LIBRARY_FOLDER in DealLibraries.js, read on every request,
so that constant stays the only place the path is set.

Run:  python serve.py
"""
import json
import os
import re
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlparse

PORT = 5502
APP_FOLDER = os.path.dirname(os.path.abspath(__file__))


def library_folder():
    with open(os.path.join(APP_FOLDER, "DealLibraries.js"), encoding="utf-8") as f:
        match = re.search(r'const\s+DEFAULT_LIBRARY_FOLDER\s*=\s*"([^"]*)"', f.read())
    return match.group(1).replace("\\\\", "\\")


def library_route(folder):
    return "/" + os.path.basename(folder) + "/"


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=APP_FOLDER, **kwargs)

    def do_GET(self):
        folder = library_folder()
        if unquote(urlparse(self.path).path) == library_route(folder):
            self.send_listing(folder)
        else:
            super().do_GET()

    def send_listing(self, folder):
        found = os.path.isdir(folder)
        files = sorted(f for f in os.listdir(folder) if f.lower().endswith(".js")) if found else []
        body = json.dumps({"folder": folder, "found": found, "files": files}).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def translate_path(self, path):
        folder = library_folder()
        route = library_route(folder)
        request_path = unquote(urlparse(path).path)
        if request_path.startswith(route):
            # basename keeps requests inside the library folder
            return os.path.join(folder, os.path.basename(request_path[len(route):]))
        return super().translate_path(path)

    def end_headers(self):
        # Always fetch fresh, so hands just saved by InstructConstruct appear
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, format, *args):
        pass


if __name__ == "__main__":
    url = f"http://localhost:{PORT}"
    try:
        server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    except OSError:
        print(f"smallCards server already running at {url}", flush=True)
    else:
        print(f"smallCards server running at {url}  (deal libraries: {library_folder()})", flush=True)
        server.serve_forever()
