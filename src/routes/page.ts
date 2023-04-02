import express, { NextFunction, Response, Request } from "express";
import { auth } from "../middlewares/auth";
import { v4 as uuidv4 } from "uuid";
import { MovieInstance } from "../model/movieModel";
import { createMovieSchema, options, updateMovieSchema } from "../utils/utils";
import { UserInstance } from "../model/userModel";

const router = express.Router();

// Pages

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.render("home");
});

router.get("/register", (req: Request, res: Response, next: NextFunction) => {
  res.render("register");
});
//render login page
router.get("/login", (req: Request, res: Response, next: NextFunction) => {
  res.render("login");
});
//display page
router.get("/dashboard", auth, async (req: Request | any, res: Response) => {
    try {
      console.log('Hey Shorty')
      const {id} = req.user
      const {movie} = await UserInstance.findOne({
        where:{id}, 
        include: {
        model: MovieInstance,
        as: "movie"
      }}) as unknown as any

      return res.render('dashboard', {
        movielist: movie,
      })

    } catch (err) {
      console.log(err);
    }
  });

//api create movie with ejs
router.post("/dashboard", auth, async (req: Request | any, res: Response) => {
  try {
    const verified = req.user;

    //const {description, title, image, price} = req.body
    const id = uuidv4();
    //Validate with Joi. Ensure you're getting string for all the inputs

    const validationResult = createMovieSchema.validate(req.body, options);

    if (validationResult.error) {
      return res
        .status(400)
        .json({ Error: validationResult.error.details[0].message });
    }

    // Check if image url already exists for user
    const movies = await MovieInstance.findAll({
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
    const movieRecord = await MovieInstance.create({
      id,
      ...req.body,
      userId: verified.id,
    });

    return res.redirect("/dashboard");
  } catch (err) {
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

router.get("/dashboard/:id", async (req: Request, res: Response) => {
    try {
      console.log("It's your birthday")
      const { id } = req.params;
      const record = await MovieInstance.findOne({ where: { id } });
      if (!record) {
        return res.render("Home", {error:"Cannot find existing movie"})
      }
  
      const deletedRecord = await record.destroy();
  
      return res.redirect('/dashboard')
  
    } catch (err) {
      console.log(err);
    }
  })



//edit movie demo start
router.get('/edit:/id', async (req:Request, res:Response, next:NextFunction) => {
  console.log("it's your birthday")
})



export default router;
