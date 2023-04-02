import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { MovieInstance } from "../model/movieModel";
import { createMovieSchema, options, updateMovieSchema } from "../utils/utils";

// export const CreateMovie = async(req:Request | any, res:Response) => {
//    try{
//         const verified = req.user;

//         //const {description, title, image, price} = req.body
//         const id = uuidv4()
//         //Validate with Joi. Ensure you're getting string for all the inputs

//         const validationResult = createMovieSchema.validate(req.body, options)

//         if(validationResult.error){
//             return res.status(400).json({Error:validationResult.error.details[0].message})
//         }

//         // Check if image url already exists for user
//         const movies = await MovieInstance.findAll({ where: { userId: verified.id }});
//         console.log(movies)
//         for (const movie of movies) {
//             if (movie.getDataValue('image') === req.body.image) {
//               return res.status(400).json({ Error: 'Image url already exists for user' });
//             }
//           }

//         //Create movie
//         const movieRecord = await MovieInstance.create({
//             id,
//             ...req.body,
//             userId: verified.id
//         })
//         return res.status(201).json({
//             msg: "movie added successfulyy",
//             movieRecord
//         })

//     }   catch(err){
//         console.log(err)
//    }
// }

export const GetMovies = async (req: Request | any, res: Response) => {
  try {
    // /movies/get-movies?limit=3&offset
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset;

    //sequelize findAll or findAndCountAll
    const getAllMovies = await MovieInstance.findAndCountAll({
      limit: limit,
      offset: offset,
    });
    return res.status(200).json({
      msg: "You have successfully gotten all movies",
      count: getAllMovies.count,
      movie: getAllMovies.rows,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UpdateMovie = async (req: Request, res: Response) => {
  try {
    //movies/update-movie/:id
    const { id } = req.params;
    const { title, description, image, price } = req.body;

    //validate with Joi
    const validationResult = updateMovieSchema.validate(req.body, options);

    if (validationResult.error) {
      return res
        .status(400)
        .json({ Error: validationResult.error.details[0].message });
    }

    const updateMovie = await MovieInstance.findOne({ where: { id } });

    if (!updateMovie) {
      res.status(400).json({
        err: "Cannot find existing movie",
      });
    }

    const updatedRecord = await updateMovie?.update({
      title,
      description,
      image,
      price,
    });

    return res.status(200).json({
      msg: "You have successfully updated a movie",
      updatedRecord,
    });
  } catch (err) {
    console.log(err);
  }
};

// export const DeleteMovie = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const record = await MovieInstance.findOne({ where: { id } });
//     if (!record) {
//       return res.status(404).json({
//         err: "Movie not found. Delete failed.",
//       });
//     }

//     const deletedRecord = await record.destroy();

//     return res.status(200).json({
//       msg: "You have successfully deleted a movie",
//       deletedRecord,
//     });

//   } catch (err) {
//     console.log(err);
//   }
// };
