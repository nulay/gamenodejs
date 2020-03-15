class Auction {
    //private GameMonopoly gameMonopoly;
    var gameMonopoly;
    //private UserMonopoly auctionUser = null;
    var auctionUser = null;
    //private CardFirm auctionStartFirm = null;
    var auctionStartFirm = null;
    //private List<UserMonopoly> userGoAuction = null;
    var userGoAuction = null;
    //private int old_price;
    var old_price;

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
        ActionUser.createInstance(gameMonopoly, gameMonopoly.getCurentUser(), AUCTION_START, this.auctionStartFirm);
    }

    //public void nextGamer() {
    nextGamer() {
        if (this.userGoAuction.length == 0) {
            ActionUser.createInstance(this.gameMonopoly, this.gameMonopoly.getCurentUser(), AUCTION_BRACK, null);
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
            buyFirm();
            return;
        }
        this.auctionUser.setActivGamer(true);
        var sdf = auctionUser.getAvailableAction();
        Array.prototype.push.apply(first, [AUCTION_BUY, AUCTION_FOLD]);
        
        ActionUser.createInstance(this.gameMonopoly, this.auctionUser, AUCTION_CHANGE_USER, this.auctionStartFirm);
    }

    //public void auctionBuy() {
    auctionBuy() {
        if (this.auctionUser.getAvailableAction().contains(AUCTION_BUY)) {
            this.auctionUser.getAvailableAction().splice(0,auctionUser.getAvailableAction().length);
            if (this.userGoAuction.size() == 1) {
                buyFirm();
                return;
            }
            ActionUser.createInstance(this.gameMonopoly, this.auctionUser, AUCTION_BUY, this.auctionStartFirm);
            this.auctionStartFirm.setPrice(this.auctionStartFirm.getPrice() + Math.round(this.old_price / 10));
            //убираем тех, кто не может поставить такую цену
            var lr = [];
            for (var i = 0; i < this.userGoAuction.length; i++) {
                if (this.userGoAuction[i] != auctionUser) {
                    if (this.userGoAuction[i].getMoney() < this.auctionStartFirm.getPrice()) {
                        lr[lr.length]=this.userGoAuction[i];
                        ActionUser.createInstance(this.gameMonopoly, this.auctionUser, AUCTION_FOLD, this.auctionStartFirm);
                    }
                }
            }
//TODO
            this.userGoAuction.removeAll(lr);
            nextGamer();
        } else {
            //штраф
            this.gameMonopoly.penaltyCheating(this.auctionUser);
        }
    }

    public void auctionFold() {
        if (auctionUser.getAvailableAction().contains(AUCTION_FOLD)) {
            auctionUser.getAvailableAction().clear();
            userGoAuction.remove(auctionUser);
            ActionUser.createInstance(gameMonopoly, auctionUser, AUCTION_FOLD, null);
            if (userGoAuction.size() == 0) {
                auctionUser.setActivGamer(false);
                ActionUser.createInstance(gameMonopoly, auctionUser, AUCTION_BRACK, null);
                auctionStartFirm.setPrice(old_price);
                gameMonopoly.stopAuction();
                return;
            } else {
                nextGamer();
            }
        } else {
            //штраф
            gameMonopoly.penaltyCheating(auctionUser);
        }
    }

    private void buyFirm() {
        if (auctionUser.getMoney() > auctionStartFirm.getPrice()) {
            //забираем у выигравшего деньги за фирму
            auctionUser.setMoney(auctionUser.getMoney() - auctionStartFirm.getPrice());
            ActionUser.createInstance(gameMonopoly, auctionUser, BUY_FIRM, auctionStartFirm);

            auctionStartFirm.setUserOwner(auctionUser);

            //объявившему аукцион отдаем заработанное на аукционе
            gameMonopoly.getCurentUser().setMoney(gameMonopoly.getCurentUser().getMoney() + (auctionStartFirm.getPrice() - old_price));
            ActionUser.createInstance(gameMonopoly, auctionUser, PAY_PENALTY, (auctionStartFirm.getPrice() - old_price));

            auctionUser.setActivGamer(false);
        }
        gameMonopoly.stopAuction();
    }

    public CardFirm getAuctionStartFirm() {
        return auctionStartFirm;
    }

    public UserMonopoly getAuctionUser() {
        return auctionUser;
    }
}
