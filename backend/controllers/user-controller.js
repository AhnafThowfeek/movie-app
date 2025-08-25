export const test = (req, res) =>{
    res.json({
     message:"API working",
    });
    console.log(req.headers)
 };