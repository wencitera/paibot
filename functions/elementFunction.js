module.exports = {

    hexElement: function hexElement(chr) {
        hex = ""
        switch (chr.toLowerCase()) {
            case "pyro":
                hex = "#f00a0a";
                break;
            case "cryo":
                hex = "#0abef0";
                break;
            case "geo":
                hex = "#f0c20a";
                break;
            case "hydro":
                hex = "#0af0e5";
                break;
            case "anemo":
                hex = "#0af088";
                break;
            case "electro":
                hex = "#9c0af0";
                break;
            case "dendro":
                hex = "#0dd417";
                break;
            case "adaptive":
                hex = "#f4ff61";
                break;
        }
        return hex;
    }
}