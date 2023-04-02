"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const uuid_1 = require("uuid");
const movieModel_1 = require("../model/movieModel");
const utils_1 = require("../utils/utils");
const userModel_1 = require("../model/userModel");
const router = express_1.default.Router();
// Pages
router.get("/", (req, res, next) => {
    res.render("home");
});
router.get("/register", (req, res, next) => {
    res.render("register");
});
//render login page
router.get("/login", (req, res, next) => {
    res.render("login");
});
//display page
router.get("/dashboard", auth_1.auth, async (req, res) => {
    try {
        console.log('Hey Shorty');
        const { id } = req.user;
        const { movie } = await userModel_1.UserInstance.findOne({
            where: { id },
            include: {
                model: movieModel_1.MovieInstance,
                as: "movie"
            }
        });
        return res.render('dashboard', {
            movielist: movie,
        });
    }
    catch (err) {
        console.log(err);
    }
});
//api create movie with ejs
router.post("/dashboard", auth_1.auth, async (req, res) => {
    try {
        const verified = req.user;
        //const {description, title, image, price} = req.body
        const id = (0, uuid_1.v4)();
        //Validate with Joi. Ensure you're getting string for all the inputs
        const validationResult = utils_1.createMovieSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res
                .status(400)
                .json({ Error: validationResult.error.details[0].message });
        }
        // Check if image url already exists for user
        const movies = await movieModel_1.MovieInstance.findAll({
            where: { userId: verified.id },
        });
        console.log(movies);
        for (const movie of movies) {
            if (movie.getDataValue("image") === req.body.image) {
                return res
                    .status(400)
                    .json({ Error: "Image url already exists for user" });
            }
        }
        //Create movie
        const movieRecord = await movieModel_1.MovieInstance.create({
            id,
            ...req.body,
            userId: verified.id,
        });
        return res.redirect("/dashboard");
    }
    catch (err) {
        console.log(err);
    }
});
//Get todo owned by a user
// router.get('/dashboard', auth, async (req: Request | any, res: Response) => {
//     try {
//       const {id} = req.user
//       const {movie} = await UserInstance.findOne({
//         where:{id}, 
//         include: {
//         model: MovieInstance,
//         as: "movie"
//       }}) as unknown as any
//       return res.render('dashboard', {
//         movielist: movie
//       })
//     } catch (err) {
//       console.log(err);
//     }
//   });
//Delete movie
router.get("/dashboard/:id", async (req, res) => {
    try {
        console.log("It's your birthday");
        const { id } = req.params;
        const record = await movieModel_1.MovieInstance.findOne({ where: { id } });
        if (!record) {
            return res.render("Home", { error: "Cannot find existing movie" });
        }
        const deletedRecord = await record.destroy();
        return res.redirect('/dashboard');
    }
    catch (err) {
        console.log(err);
    }
});
//edit movie demo start
router.get('/edit:/id', async (req, res, next) => {
    console.log("it's your birthday");
});
exports.default = router;
//# sourceMappingURL=page.js.map