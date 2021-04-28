import settingsModel from "../models/settings.js";

class settingsController{
    static getMaxPeople = async function () {
        return settingsModel.querySettings("maxPeople")
    };

    static setMaxPeople = async function (req, res) {
        let value = req.body.value;  //todo??
        return settingsModel.updateSettings("maxPeople", value)
    }
}


export default settingsController;
