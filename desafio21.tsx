import express from "npm:express";

const app: any = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const colors: any = []


const getColors = () => {
  let body: string = "";
  if (colors.length > 0) {
    colors?.map((color: string) => {
      let style='"' + `color: ${color}; display: inline-block`+'"' ;
      if (color==="black") style= '"' + `color: ${color}; background-color: grey; display: inline-block`+'"';
      body = body + `<li><p style= ${style}>${color}</p></li>`
    });
  }
  return body;
}


app.get("/", (_: any, res: any) => {
  let body = getColors();
  res.send(`<!DOCTYPE html>
   <html  style="background-color: purple">
   <head>
       <title>Colors</title>
       <form method="post" action="/">
           <input type="text" id="colorInput" name="color">
           <button type="submit">Send</button>
       </form>
       <ul>
          ${body} 
        </ul>
   </head>
   
   <body>
   </body>
   </html>` )
});

app.post("/", async (req: any,res: any) => {
  colors.push(req.body.color);
  res.redirect('/');
})

const PORT= 8080;
app.listen(PORT,() => {
  console.log(`Servidor esuchando en el puerto ${PORT}`);
});