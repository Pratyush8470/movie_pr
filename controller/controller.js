const models = require("../model/db/mongoose.js");
const fs = require('fs');

const localHost = async (req, res) => {
    const data = await models.find({});

    res.render("index", { data });
};

const addData = async (req, res) => {
    console.log("hello", req.body);

    const obj = {
        path: req.file.path,
        movieName: req.body.movieName,
        price: req.body.price,
        seatNo: req.body.seatNo,
        name: req.body.name,
        mobileNo: req.body.mobileNo,
        method: req.body.method,
        other: req.body.other,
    };
    console.log("data", obj);
    const newObjModel = new models(obj)
    await newObjModel.save();

    res.redirect("/");
};

const editData = async (req, res) => {
    let { id } = req.params;

    const edit = await models.findOne({ _id: id });

    console.log("rec", edit);
    res.render("edit", { edit: edit });
};

const updateData = async (req, res) => {
    let { id } = req.params;
    console.log("ok", req.body);


    const update = await models.findByIdAndUpdate(
        { _id: id },
        {
            movieName: req.body.movieName,
            price: req.body.price,
            seatNo: req.body.seatNo,
            name: req.body.name,
            mobileNo: req.body.mobileNo,
            method: req.body.method,
            other: req.body.other,
        },
        {
            new: true,
        }
    );
    if (req.file) {
        update.path = req.file.path
    }
    if (req.path) {
        fs.unlink(update.path, (err) => {
            console.log(err);
        })
        console.log("delete previose path...");

    }
    const updateMovie = await models.findByIdAndUpdate(id, update, { new: true });


    console.log("Update", updateMovie);

    res.redirect("/");
};

const deleteData = async (req, res) => {
    let { id } = req.params;

    const delet = await models.findByIdAndDelete({ _id: id });

    res.redirect("/");
};
module.exports = { localHost, addData, editData, updateData, deleteData };
