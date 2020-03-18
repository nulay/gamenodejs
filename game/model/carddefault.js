class CardDefault{
    //card name
    //private String name;
    name;
    //path to image card
    //private String 
    image;
    type;

    /**
     * Default constructor for card
     */
    constructor(name, type, image) {
       this.name = name;
       this.type = type;
       this.image = image;
    }

    /**
     * Method return Name card
     * @return name card
     */
    //public String getName() {
    getName() {
        return this.name;
    }

    /**
     * Method set name card
     * @param name - name card
     */
    //public void setName(String name) {
    setName(name) {
        this.name = name;
    }

    /**
     * Method return path to image card
     * @return path to image card
     */
    //public String getImage() {
    getImage() {
        return this.image;
    }

    /**
     * Method set for path to image card
     * @param image path to image card
     */
    //public void setImage(String image) {
    setImage(image) {
        this.image = image;
    }

    getType() {
        return this.type;
    }
    
    setType(type) {
        this.type = type;
    }
}


module.exports = CardDefault;

