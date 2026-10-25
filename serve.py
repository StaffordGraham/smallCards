"""Serve smallCards at http://localhost:5502 and let it choose its deal library file.

A web page can neither show a file dialog that starts in a given folder nor learn a file's
full path, so this server does both for the Select Deal Library button:
    /library/choose             opens a Windows file dialog in DEFAULT_LIBRARY_FOLDER;
                                JSON {"path": full path} or {"path": null} if cancelled
    /library/file?path=<path>   the contents of that .js library file
Everything else is served from the smallCards folder.

DEFAULT_LIBRARY_FOLDER is read from DealLibraries.js, so that constant stays the only place it is set.

Run:  python serve.py
"""
import json
import os
import re
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, unquote, urlparse

PORT = 5502
APP_FOLDER = os.path.dirname(os.path.abspath(__file__))
dialog_lock = threading.Lock()   # one file dialog at a time


def library_folder():
    with open(os.path.join(APP_FOLDER, "DealLibraries.js"), encoding="utf-8") as f:
        match = re.search(r'const\s+DEFAULT_LIBRARY_FOLDER\s*=\s*"([^"]*)"', f.read())
    return match.group(1).replace("\\\\", "\\")


def choose_library_file():
    """Show a Windows Open dialog in DEFAULT_LIBRARY_FOLDER; the chosen file's full path, or None."""
    import tkinter
    from tkinter import filedialog
    with dialog_lock:
        root = tkinter.Tk()
        root.withdraw()
        root.attributes("-topmost", True)   # in front of the browser
        try:
            path = filedialog.askopenfilename(
                parent=root, title="Select Deal Library", initialdir=library_folder(),
                filetypes=[("Deal library", "*.js"), ("All files", "*.*")])
        finally:
            root.destroy()
    return os.path.normpath(path) if path else None


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=APP_FOLDER, **kwargs)

    def do_GET(self):
        url = urlparse(self.path)
        if url.path == "/library/choose":
            self.send_json({"path": choose_library_file()})
        elif url.path == "/library/file":
            self.send_library_file(parse_qs(url.query).get("path", [""])[0])
        else:
            super().do_GET()

    def send_json(self, data):
        self.send_body(json.dumps(data).encode("utf-8"), "application/json")

    def send_library_file(self, path):
        if not path.lower().endswith(".js"):
            self.send_error(400, "A deal library must be a .js file")
        elif not os.path.isfile(path):
            self.send_error(404, "File not found")
        else:
            with open(path, "rb") as f:
                self.send_body(f.read(), "text/javascript; charset=utf-8")

    def send_body(self, body, content_type):
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def end_headers(self):
        # Always fetch fresh, so hands just saved by InstructConstruct appear
        self.send_header("Cache-Control", "no-store")
        # Tells the page it is talking to this server (not Live Server)
        self.send_header("X-SmallCards", "1")
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
        print(f"smallCards server running at {url}", flush=True)
        server.serve_forever()
