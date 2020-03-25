class Auction {
    //private GameMonopoly gameMonopoly;
    gameMonopoly;
    //private UserMonopoly auctionUser = null;
    auctionUser = null;
    //private CardFirm auctionStartFirm = null;
    auctionStartFirm = null;
    //private List<UserMonopoly> userGoAuction = null;
    userGoAuction = null;
    //private int old_price;
    old_price;

    //public Auction(GameMonopoly gameMonopoly) {
    constructor( gameMonopoly) {
        this.gameMonopoly = gameMonopoly;
        this.auctionStartFirm = gameMonopoly.getListCard()[gameMonopoly.getCurentUser().getIndexPosition()];
        this.old_price = this.auctionStartFirm.getPrice();
        //priceTop=Math.round(old_price/10);
        this.userGoAuction = [];
        var indCU = gameMonopoly.getListUser().indexOf(gameMonopoly.getCurentUser());
        if (gameMonopoly.getListUser().size() - 1 != indCU) {
            for (var i = indCU + 1; i < gameMonopoly.getListUser().length; i++) {
                if (gameMonopoly.getListUser().get(i).getMoney() >= this.auctionStartFirm.getPrice()) {
                    this.userGoAuction.add(gameMonopoly.getListUser().get(i));
                }
            }
        }
        if (indCU != 0) {
            for (var i = 0; i < indCU; i++) {
                if (gameMonopoly.getListUser()[i].getMoney() > this.auctionStartFirm.getPrice()) {
                    this.userGoAuction[userGoAuction.length] = gameMonopoly.getListUser()[i];
                }
            }
        }
        ActionUser.createInstance(gameMonopoly, gameMonopoly.getCurentUser(), "AUCTION_START", this.auctionStartFirm);
    }

    //public void nextGamer() {
    nextGamer() {
        if (this.userGoAuction.length == 0) {
            ActionUser.createInstance(this.gameMonopoly, this.gameMonopoly.getCurentUser(), "AUCTION_BRACK", null);
            this.gameMonopoly.stopAuction();
            return;
        }
        if (this.auctionUser == null) {
            this.auctionUser = this.userGoAuction[0];
        } else {
            this.auctionUser.setActivGamer(false);
            if (this.userGoAuction[this.userGoAuction.length - 1] == this.auctionUser) {
                this.auctionUser = this.userGoAuction[0];
            } else {
                this.auctionUser = this.userGoAuction[this.userGoAuction.indexOf(this.auctionUser) + 1];
            }
        }
        if (this.userGoAuction.length == 1 && this.auctionStartFirm.getPrice() > this.old_price) {
            this.buyFirm();
            return;
        }
        this.auctionUser.setActivGamer(true);
        var sdf = auctionUser.getAvailableAction();
        Array.prototype.push.apply(first, ["AUCTION_BUY", "AUCTION_FOLD"]);
        
        ActionUser.createInstance(this.gameMonopoly, this.auctionUser, "AUCTION_CHANGE_USER", this.auctionStartFirm);
    }

    //public void auctionBuy() {
    auctionBuy() {
        if (this.auctionUser.getAvailableAction().includes("AUCTION_BUY")) {
            this.auctionUser.getAvailableAction().splice(0,this.auctionUser.getAvailableAction().length);
            if (this.userGoAuction.size() == 1) {
                this.buyFirm();
                return;
            }
            ActionUser.createInstance(this.gameMonopoly, this.auctionUser, "AUCTION_BUY", this.auctionStartFirm);
            this.auctionStartFirm.setPrice(this.auctionStartFirm.getPrice() + Math.round(this.old_price / 10));
            //убираем тех, кто не может поставить такую цену
            var lr = [];
            for (var i = 0; i < this.userGoAuction.length; i++) {
                if (this.userGoAuction[i] != auctionUser) {
                    if (this.userGoAuction[i].getMoney() < this.auctionStartFirm.getPrice()) {
                        lr[lr.length]=this.userGoAuction[i];
                        ActionUser.createInstance(this.gameMonopoly, this.auctionUser, "AUCTION_FOLD", this.auctionStartFirm);
                    }
                }
            }
            //this.userGoAuction.removeAll(lr);
            this.userGoAuction = this.userGoAuction.filter( ( lr ) => !toRemove.includes( lr ) );
            this.nextGamer();
        } else {
            //штраф
            this.gameMonopoly.penaltyCheating(this.auctionUser);
        }
    }

    //public void auctionFold() {
    auctionFold() {
        if (this.auctionUser.getAvailableAction().includes("AUCTION_FOLD")) {
            this.auctionUser.getAvailableAction().splice(0, this.auctionUser.getAvailableAction().length);
            this.userGoAuction.splice(this.userGoAuction.indexOf(auctionUser),1);
            ActionUser.createInstance(this.gameMonopoly, this.auctionUser, "AUCTION_FOLD", null);
            if (this.userGoAuction.size() == 0) {
                this.auctionUser.setActivGamer(false);
                ActionUser.createInstance(this.gameMonopoly, this.auctionUser, "AUCTION_BRACK", null);
                this.auctionStartFirm.setPrice(this.old_price);
                this.gameMonopoly.stopAuction();
                return;
            } else {
                this.nextGamer();
            }
        } else {
            //штраф
            this.gameMonopoly.penaltyCheating(this.auctionUser);
        }
    }

    //private void buyFirm() {
    buyFirm() {
        if (this.auctionUser.getMoney() > this.auctionStartFirm.getPrice()) {
            //забираем у выигравшего деньги за фирму
            this.auctionUser.setMoney(this.auctionUser.getMoney() - this.auctionStartFirm.getPrice());
            ActionUser.createInstance(this.gameMonopoly, this.auctionUser, "BUY_FIRM", this.auctionStartFirm);

            this.auctionStartFirm.setUserOwner(this.auctionUser);

            //объявившему аукцион отдаем заработанное на аукционе
            this.gameMonopoly.getCurentUser().setMoney(this.gameMonopoly.getCurentUser().getMoney() + (this.auctionStartFirm.getPrice() - this.old_price));
            ActionUser.createInstance(this.gameMonopoly, this.auctionUser, "PAY_PENALTY", (this.auctionStartFirm.getPrice() - this.old_price));

            this.auctionUser.setActivGamer(false);
        }
        this.gameMonopoly.stopAuction();
    }

    //public CardFirm getAuctionStartFirm() {
    getAuctionStartFirm() {
        return this.auctionStartFirm;
    }

    //public UserMonopoly getAuctionUser() {
    getAuctionUser() {
        return this.auctionUser;
    }
}
