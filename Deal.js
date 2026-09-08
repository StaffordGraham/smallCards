class Deal{
  constructor(data){
    
      this.name=data?.name;
      this.bidLevel=0
      this.south_cards=data?.south_cards;
      this.north_cards=data?.north_cards;
      this.east_cards=data?.east_cards;
      this.west_cards=data?.west_cards;
      this.southAuto=data?.southAuto;
      this.westAuto=data?.westAuto;
      this.northAuto=data?.northAuto;
      this.eastAuto=data?.eastAuto;
        this.contract=data?.contract;
        this.bidSuit=data?.bidSuit;
        this.declarer=data?.declarer;
        this.vulnerability=data?.vulnerability; 
        this.w_leads=data?.w_leads || [];
        this.e_leads=data?.e_leads || [];
        this.eastPartnerLeadSuit=data?.eastPartnerLeadSuit || "";
        this.westPartnerLeadSuit=data?.westPartnerLeadSuit || "";
        this.west_leadto_return= data?.west_leadto_return || "";
        this.east_leadto_return=data?.east_leadto_return || "";
        this.w_leadto_return=data?.w_leadto_return || "";
        this.e_leadto_return=data?.e_leadto_return || "";
        this.book=data?.book || "";
        this.description=data?.description || "";  
        this.page=data?.page || "";
        this.commentary=data?.commentary || "";
        const st=this.contract
        const parts=st.split(" ");
        this.bidLevel=parseInt(parts[0],10);
        this.bidSuit=parts[1][0];
        this.contractMessage=this.getContract()
  }




    
  short_Contract(){
let st=this.bidSuit
let suitDict ={
  'S':'Spade',
  "H": 'Heart',
  "D": 'Diamond',
  "C": 'Club',
  "N":'No Trump'
}
let plural =''

let trumpSuit=suitDict[st]
if( this.bidLevel>1){plural='s'}

this.theContract +=this.contract + " "+trumpSuit+plural 



  }
  getTrump(){

    
  }
getContractFull(){

let contract = ''
let suitDict ={
  'S':'Spade',
  "H": 'Heart',
  "D": 'Diamond',
  "C": 'Club',
  "N":'No Trump'
}
let plural =''
let st=this.bidSuit
let aim = parseInt(this.contract)
aim +=6
let trumpSuit=suitDict[st]
if( this.contract>1){plural='s'}

contract +=this.contract + " "+trumpSuit+plural 
console.log(this.contract_full)
return contract
}

getContract(){

let contract = "The contract is "
let suitDict ={
  'S':'Spade',
  "H": 'Heart',
  "D": 'Diamond',
  "C": 'Club',
  "N":'No Trump'
}
let plural =''
let st=this.bidSuit
let aim = parseInt(this.contract)
aim +=6
let trumpSuit=suitDict[st]
if( this.contract>1){plural='s'}
contract +=this.contract +  "\n"+ "Make "+aim+ " tricks "+ "with "+ trumpSuit + "s as trumps"

return contract
}


  
}
class BidDeal{
constructor(data){
        this.south_cards=data?.south_cards;


}

}
// End BidDeal class

