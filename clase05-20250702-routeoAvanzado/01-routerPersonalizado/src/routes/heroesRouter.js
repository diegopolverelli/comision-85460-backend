import { midd01, midd02 } from "../middlewares/middlewares.js";
import { CustomRouter } from "./router.js";
export const heroesRouter=new CustomRouter()

let heroes=[
    {
        id:1,
        name:'Spider-Man',
        alias:'Peter Parker',
        team:'Avengers',
        publisher:'Marvel',
    },
    {
        id:2,
        name:'Superman',
        alias:'Clark Kent',
        team:'Justice League',
        publisher:'DC',
    },
    {
        id:3,
        name:'Iron Man',
        alias:'Tony Stark',
        team:'Avengers',
        publisher:'Marvel',
    },
    {
        id:4,
        name:'Wonder Woman',
        alias:'Diana Prince',
        team:'Justice League',
        publisher:'DC',
    },
    {
        id:5,
        name:'Black Widow',
        alias:'Natasha Romanoff',
        team:'Avengers',
        publisher:'Marvel',
    },
    {
        id:6,
        name:'Batman',
        alias:'Bruce Wayne',
        team:'Justice League',
        publisher:'DC',
    },
    {
        id:7,
        name:'Aquaman',
        alias:'Arthur Curry',
        team:'Justice League',
        publisher:'DC',
    },
    {
        id:8,
        name:'Captain America',
        alias:'Steve Rogers',
        team:'Avengers',
        publisher:'Marvel',
    },
    {
        id:9,
        name:'Flash',
        alias:'Barry Allen',
        team:'Justice League',
        publisher:'DC',
    },
    {
        id:10,
        name:'Black Panther',
        alias:'TChalla',
        team:'Avengers',
        publisher:'Marvel',
    },
    {
        id:11,
        name:'Green Lantern',
        alias:'Hal Jordan',
        team:'Justice League',
        publisher:'DC',
    },
    {
        id:12,
        name:'Thor',
        alias:'Thor Odinson',
        team:'Avengers',
        publisher:'Marvel',
    },
    {
        id:13,
        name:'Batwoman',
        alias:'Kate Kane',
        team:'Bat Family',
        publisher:'DC',
    },
    {
        id:14,
        name:'Hulk',
        alias:'Bruce Banner',
        team:'Avengers',
        publisher:'Marvel',
    },
    {
        id:15,
        name:'Zatanna',
        alias:'Zatanna Zatara',
        team:'Justice League Dark',
        publisher:'DC',
    },
    {
        id:16,
        name:'Doctor Strange',
        alias:'Stephen Strange',
        team:'Defenders',
        publisher:'Marvel',
    },
    {
        id:17,
        name:'Green Arrow',
        alias:'Oliver Queen',
        team:'Justice League',
        publisher:'DC',
    },
    {
        id:18,
        name:'Scarlet Witch',
        alias:'Wanda Maximoff',
        team:'Avengers',
        publisher:'Marvel',
    },
    {
        id:19,
        name:'Martian Manhunter',
        alias:'Jonn Jonzz',
        team:'Justice League',
        publisher:'DC',
    },
    {
        id:20,
        name:'Deadpool',
        alias:'Wade Wilson',
        team:'None',
        publisher:'Marvel',
    },
]

heroesRouter.router.authGet("/", (req, res)=>{

    let {nombre}=req.query
    if(nombre=="juan") throw new Error("error en nombre")

    // res.setHeader('Content-Type','application/json');
    // return res.status(200).json({payload:"heroes"});
    res.success(200, `Heroes recuperados...!!!`, heroes)
})

heroesRouter.router.authGet(
    "/:id", 
    midd01, 
    midd02, 
    (req, res)=>{
        let {id}=req.params
        id=Number(id)
        if(isNaN(id)){
            throw new Error(`El id debe ser numérico`)
            // return res.badRequest(`El id debe ser numérico`)
        }

        let heroe=heroes.find(h=>h.id==id)
        if(!heroe) return res.notFound(`No existen heroes con id ${id}`)

        res.success(200, `Heroe recuperado`, heroe)
    }
)

heroesRouter.router.authPost("/", (req, res)=>{


    res.success(201, `Heroe creado`, {name:"Robin"})
})