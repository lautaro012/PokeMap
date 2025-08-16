import type { Zone } from "../types/types";


export const ZONES: Zone[] = [
  {
    id: "pueblo-paleta",
    name: "Pueblo Paleta",
    kind: "city",
    minimapImageKey: "pueblo-paleta",
    mainMapShape: { type: "rect", x: 580/1500, y: 765/1300, w: 70/1500, h: 70/1300 },
    spawnAreas: [{
        id: "pueblo-paleta-sea",           
        biome: "sea",        
        method: "surf",       
        shape: { type: "rect", x: 0.3, y: 0.78, w: .1, h: .2 },     
        capacity: 2,     
        weight: 1,
        //anchors?: { x: number; y: number }[]
    }]
  },
  {
    id: "ciudad-verde",
    name: "Ciudad Verde",
    kind: "city",
    minimapImageKey: "ciudad-verde",
    mainMapShape: { type: "rect", x: 550/1500, y: 535/1300, w: 100/1500, h: 100/1300 },
    spawnAreas: [{
        id: "ciudad-verde-lake",           
        biome: "lake",        
        method: "rod",
        rodTier: "old",      
        shape: { type: "rect", x: 0.37, y: 0.66, w: .07, h: .05 },     
        capacity: 2,     
        weight: 1,
        //anchors?: { x: number; y: number }[]
    }]
  },
  {
    id: "ciudad-plateada",
    name: "Ciudad Plateada",
    kind: "city",
    minimapImageKey: "ciudad-plateada",
    mainMapShape: { type: "rect", x: 580/1500, y: 250/1300, w: 100/1500, h: 100/1300 },
    spawnAreas: []
  },
  {
    id: "ciudad-carmin",
    name: "Ciudad Carmin",
    kind: "city",
    minimapImageKey: "ciudad-carmin",
    mainMapShape: { type: "rect", x: 1050/1500, y: 650/1300, w: 100/1500, h: 130/1300 },
    spawnAreas: [{
        id: "ciudad-carmin-sea-north",           
        biome: "sea",        
        method: "surf",       
        shape: { type: "rect", x: 0.13, y: 0.27, w: .18, h: .03 },     
        capacity: 2,     
        weight: 1,
        //anchors?: { x: number; y: number }[]
    },
    {
        id: "ciudad-carmin-sea-east",           
        biome: "sea",        
        method: "surf",       
        shape: { type: "rect", x: 0.2, y: 0.62, w: .05, h: .03 },     
        capacity: 2,     
        weight: 1,
        //anchors?: { x: number; y: number }[]
    },
    {
        id: "ciudad-carmin-sea-south",           
        biome: "sea",        
        method: "surf",       
        shape: { type: "polygon", points:[[0.33, 0.55],[0.38,0.55],[0.38,0.6],[0.5,0.6],[0.5,0.65],[0.33,0.65]] },     
        capacity: 2,     
        weight: 1,
        //anchors?: { x: number; y: number }[]
    }
    ]
  },
  {
    id: "ciudad-azafran",
    name: "Ciudad Azafran",
    kind: "city",
    minimapImageKey: "ciudad-azafran",
    mainMapShape: { type: "rect", x: 1040/1500, y: 480/1300, w: 110/1500, h: 110/1300 },
    spawnAreas: []
  },
  {
    id: "ciudad-azulona",
    name: "Ciudad Azulona",
    kind: "city",
    minimapImageKey: "ciudad-azulona",
    mainMapShape: { type: "rect", x: 870/1500, y: 530/1300, w: 130/1500, h: 100/1300 },
    spawnAreas: [
      {
        id: "azulona-canal-lake",
        biome: "lake", method: "rod", rodTier: "old",
        shape: { type: "rect", x: 0.41, y: 0.53, w: 0.04, h: 0.04 },
        capacity: 2, weight: 0.9
      },
      {
        id: "azulona-canal-lake-2",
        biome: "lake", method: "rod", rodTier: "old",
        shape: { type: "rect", x: 0.41, y: 0.65, w: 0.04, h: 0.04 },
        capacity: 2, weight: 0.9
      }
    ]
  },
  {
    id: "ciudad-celeste",
    name: "Ciudad Celeste",
    kind: "city",
    minimapImageKey: "ciudad-celeste",
    mainMapShape: { type: "rect", x: 1050/1500, y: 320/1300, w: 100/1500, h: 100/1300 },
    spawnAreas: [      
      {
        id: "ciudad-celeste-sea",
        biome: "sea", method: "surf",
        shape: { type: "polygon", points:[[0.54,0.02],[0.59,0.02],[0.59,0.15],[0.33,0.15],[0.33,0.18],[0.21,0.18],[0.21,0.3],[0.01,0.3],[0.01,0.26],[0.17,0.26],[0.17,0.15],[0.3,0.15],[0.3,0.11],[0.54,0.11]] },
        capacity: 5, weight: 5
      }
    ]
  },
  {
    id: "ciudad-fucsia",
    name: "Ciudad Fucsia",
    kind: "city",
    minimapImageKey: "ciudad-fucsia",
    mainMapShape: { type: "rect", x: 870/1500, y: 870/1300, w: 100/1500, h: 100/1300 },
    spawnAreas: [{
      id: "ciudad-fucsia-lake",
      biome: "lake", method: "rod", rodTier: "old",
      shape: { type: "polygon", points:[[0.65,0.61],[0.67,0.61],[0.67,0.64],[0.77,0.64],[0.77,0.67],[0.65,0.67]] },
      capacity: 5, weight: 5
    }]
  },
  {
    id: "pueblo-lavanda",
    name: "Pueblo Lavanda",
    kind: "city",
    minimapImageKey: "pueblo-lavanda",
    mainMapShape: { type: "rect", x: 1275/1500, y: 525/1300, w: 80/1500, h: 75/1300 },
    spawnAreas: []
  },
  {
    id: "isla-canela",
    name: "Isla Canela",
    kind: "city",
    minimapImageKey: "isla-canela",
    mainMapShape: { type: "rect", x: 580/1500, y: 1000/1300, w: 70/1500, h: 75/1300 },
    spawnAreas: []
  },
  {
    id: "liga-pokemon",
    name: "Liga Pokémon",
    kind: "city",
    minimapImageKey: "liga-pokemon",
    mainMapShape: { type: "rect", x: 340/1500, y: 450/1300, w: 60/1500, h: 90/1300 },
    spawnAreas: []
  },
  {
    id: "zona-safari-zona-entrada",
    name: "Zona Safari Entrada",
    kind: "safari",
    minimapImageKey: "zona-safari-zona-entrada",
    mainMapShape: { type: "rect", x: 920/1500, y: 830/1300, w: 50/1500, h: 50/1300 },
    spawnAreas: [{
      id: "zona-safari-entrada-1",
      biome: "grass", method: "grass",
      shape: {
      type: "polygon", points:[[0.24,0.25],[0.39,0.25],[0.35,0.33],[0.24,0.4]]
    },
      capacity: 5, weight: 1.0
      //anchors?: { x: number; y: number }[]
    },
    {
      id: "zona-safari-entrada-2",
      biome: "grass", method: "grass",
      shape: {
      type: "polygon", points:[[0.33,0.4],[0.3,0.5],[0.35,0.53],[0.35,0.38]]
    },
      capacity: 5, weight: 1.0
      //anchors?: { x: number; y: number }[]
    },
    {
      id: "zona-safari-entrada-3",
      biome: "grass", method: "grass",
      shape: {
      type: "polygon", points:[[0.55,0.25],[0.74,0.25],[0.72,0.37],[0.67,0.33],[0.62,0.33],[0.53,0.37]]
    },
      capacity: 5, weight: 1.0
      //anchors?: { x: number; y: number }[]
    },
    {
      id: "zona-safari-entrada-4",
      biome: "grass", method: "grass",
      shape: {
      type: "polygon", points:[[0.67,0.5],[0.8,0.57],[0.8,0.68],[0.7,0.8],[0.63,0.8],[0.72,0.65]]
    },
      capacity: 5, weight: 1.0
      //anchors?: { x: number; y: number }[]
    },
    {
      id: "zona-safari-entrada-5",
      biome: "grass", method: "grass",
      shape: {
      type: "polygon", points:[[0.28,0.65],[0.42,0.65],[0.45,0.8],[0.28,0.77]]
    },
      capacity: 5, weight: 1.0
      //anchors?: { x: number; y: number }[]
    },
    {
      id: "zona-safari-entrada-lake",
      biome: "lake", method: "rod", rodTier: "old",
      shape: {
      type: "polygon", points:[[0.42,0.42],[0.42,0.49],[0.6,0.49],[0.6,0.42],[0.42,0.42],[0.42,0.38],[0.65,0.38],[0.65,0.52],[0.37,0.52],[0.37,0.38],[0.42,0.38]]
    },
      capacity: 5, weight: 1.0
      //anchors?: { x: number; y: number }[]
    }
  ]
  },
  {
    id: "zona-safari-zona-este",
    name: "Zona Safari Este",
    kind: "safari",
    minimapImageKey: "zona-safari-zona-este",
    mainMapShape: { type: "rect", x: 970/1500, y: 780/1300, w: 50/1500, h: 100/1300 },
    spawnAreas: [{
      id: "zona-safari-este-1",
      biome: "grass", method: "grass",
      shape: { type: "rect", x: 0.47, y: 0.53, w: 0.12, h: 0.05 },
      capacity: 10, weight: 1.0
      //anchors?: { x: number; y: number }[]
    },
    {
      id: "zona-safari-este-2",
      biome: "grass", method: "grass",
      shape: { type: "rect", x: 0.3, y: 0.47, w: 0.07, h: 0.1 },
      capacity: 10, weight: 1.0
      //anchors?: { x: number; y: number }[]
    },
    {
      id: "zona-safari-este-3",
      biome: "grass", method: "grass",
      shape: {type: "polygon", points:[[0.28,0.4],[0.22,0.5],[0.22,0.57],[0.26,0.63],[0.3,0.63],[0.29,0.6],[0.24,0.57],[0.24,0.48],[0.3,0.45]]},
      capacity: 10, weight: 1.0
      //anchors?: { x: number; y: number }[]
    },
    {
      id : "zona-safari-este-4",
      biome: "grass", method: "grass",
      shape: { type: "polygon", points:[[0.37,0.2], [0.65,0.2],[0.55,0.27],[0.42,0.27]] },
      capacity: 10, weight: 1.0
    },
    {
      id : "zona-safari-este-5",
      biome: "grass", method: "grass",
      shape: { type: "polygon", points:[[0.73,0.2], [0.81,0.2],[0.83,0.33],[0.72,0.33],[0.7,0.41],[0.67,0.37],[0.67,0.3]] },
      capacity: 10, weight: 1.0
    },
        {
      id : "zona-safari-este-6",
      biome: "grass", method: "grass",
      shape: { type: "polygon", points:[[0.54,0.83],[0.62,0.83],[0.62,0.77],[0.75,0.77],[0.75,0.72],[0.8,0.72],[0.81,0.8],[0.75,0.86],[0.57,0.86]]},
      capacity: 10, weight: 1.0
    },
    {
      id: "zona-safari-este-lake",
      biome: "lake", method: "rod", rodTier: "old",
      shape: { type: "polygon", points:[[0.5,0.46],[0.65,0.46],[0.65,0.5],[0.62,0.55],[0.62,0.6],[0.65,0.6],[0.65,0.64],[0.5,0.64],[0.5,0.6],[0.6,0.6],[0.6,0.52],[0.5,0.52]] },
      capacity: 5, weight: 1.0
      //anchors?: { x: number; y: number }[] 
    },
  ]
  },
  {
    id: "zona-safari-zona-norte",
    name: "Zona Safari Norte",
    kind: "safari",
    minimapImageKey: "zona-safari-zona-norte",
    mainMapShape: { type: "rect", x: 870/1500, y: 780/1300, w: 100/1500, h: 50/1300 },
    spawnAreas: [
      {
        id: "zona-safari-norte-1",
        biome: "grass", method: "grass",
        shape: { type: "rect", x: 0.19, y: 0.18, w: 0.1, h: 0.15 },
        capacity: 10, weight: 1.0
        //anchors?: { x: number; y: number }[]
      },
      {
        id: "zona-safari-norte-2",
        biome: "grass", method: "grass",
        shape: { type: "polygon", points:[[0.65,0.14],[0.73,0.14],[0.7,0.2],[0.7,0.28],[0.75,0.33],[0.75,0.37],[0.71,0.37],[0.71,0.35],[0.66,0.35],[0.62,0.29],[0.62,0.25],[0.6,0.25]]},
        capacity: 10, weight: 1.0
        //anchors?: { x: number; y: number }[]
      },
      {
        id : "zona-safari-norte-3",
        biome: "grass", method: "grass",
        shape: { type: "polygon", points:[[0.37,0.31],[0.42,0.31],[0.42,0.47],[0.33,0.52],[0.3,0.46],[0.37,0.45]] },
        capacity: 10, weight: 1.0
      },
      {
        id : "zona-safari-norte-4",
        biome: "grass", method: "grass",
        shape: { type: "polygon", points:[[0.51,0.64],[0.59,0.64],[0.59,0.76],[0.62,0.76],[0.65,0.8],[0.6,0.84],[0.53,0.81],[0.53,0.77],[0.5,0.77]] },
        capacity: 10, weight: 1.0
      },
      {
        id : "zona-safari-norte-5",
        biome: "grass", method: "grass",
        shape: { type: "polygon", points:[[0.32,0.58],[0.37,0.58],[0.4,0.68],[0.38,0.7],[0.37,0.65],[0.3,0.65],[0.3,0.77],[0.27,0.71],[0.27,0.65]] },
        capacity: 10, weight: 1.0
      },
      {
        id : "zona-safari-norte-lake-1",
        biome: "lake", method: "rod", rodTier: "old",
        shape: { type: "polygon", points:[[0.31,0.29],[0.36,0.29],[0.36,0.4],[0.31,0.4],[0.28,0.45],[0.28,0.56],[0.24,0.56],[0.24,0.45],[0.28,0.45],[0.31,0.4]] },
        capacity: 10, weight: 1.0
      }
    ]
  },
  {
    id: "zona-safari-zona-oeste",
    name: "Zona Safari Oeste",
    kind: "safari",
    minimapImageKey: "zona-safari-zona-oeste",
    mainMapShape: { type: "rect", x: 870/1500, y: 830/1300, w: 50/1500, h: 50/1300 },
    spawnAreas: [
      {
        id: "zona-safari-oeste",
        biome: "grass", method: "grass",
        shape: { type: "polygon", points:[[0.19,0.67],[0.22,0.67],[0.22,0.77],[0.57,0.77],[0.5,0.85],[0.47,0.83],[0.37,0.83],[0.31,0.85],[0.17,0.75]] },
        capacity: 10, weight: 1.0
      },
      {
        id:"zona-safari-oeste-lake",
        biome: "lake", method: "surf",
        shape: { type: "rect" , x: 0.15, y: 0.45, w: 0.2, h: 0.1 },
        capacity: 5, weight: 1.0
      }
    ]
  },
  {
    id: "ruta-1",
    name: "Ruta 1",
    kind: "grass",
    minimapImageKey: "ruta-1",
    mainMapShape: { type: "rect", x: 580/1500, y: 630/1300, w: 70/1500, h: 130/1300 },
    spawnAreas: [
      {
        id: "ruta-1-grass-1",
        biome: "grass", method: "grass",
        shape: { type: "rect", x: 0.34, y: 0.27, w: 0.5, h: 0.05 },
        capacity: 10, weight: 1.0
      },
      {
        id: "ruta-1-grass-2",
        biome: "grass", method: "grass",
        shape: { type: "polygon", points: [[0.64,0.39],[0.8,0.42],[0.8,0.51],[0.64,0.49]]},
        capacity: 10, weight: 1.0
      },
      {
        id: "ruta-1-grass-3",
        biome: "grass", method: "grass",
        shape: { type: "polygon", points: [[0.65,0.72],[0.8,0.74],[0.8,0.8],[0.57,0.8],[0.57,0.77],[0.65,0.77]]},
        capacity: 10, weight: 1.0
      },
      {
        id: "ruta-1-grass-4",
        biome: "grass", method: "grass",
        shape: { type: "polygon", points: [[0.72,0.84],[0.9,0.84],[0.9,0.88],[0.8,0.9], [0.57,0.9], [0.55,1], [0.45,1],[0.45,0.92],[0.55,0.92],[0.57,.9],[0.57,0.88],[0.72,0.88]]},
        capacity: 10, weight: 1.0
      },
      {
        id: "ruta-1-grass-5",
        biome: "grass", method: "grass",
        shape: { type: "polygon", points: [[0.1,0.84],[0.32,0.84],[0.32,0.87],[0.22,0.9],[0.1,0.9]]},
        capacity: 10, weight: 1.0
      }
    ]
  },
  {
    id: "bosque-verde",
    name: "Bosque Verde",
    kind: "grass",
    minimapImageKey: "bosque-verde",
    mainMapShape: { type: "rect", x: 510/1500, y: 340/1300, w: 100/1500, h: 130/1300 },
    spawnAreas: []
  },
  {
    id: "ruta-2",
    name: "Ruta 2",
    kind: "grass",
    minimapImageKey: "ruta-2",
    mainMapShape: { type: "rect", x: 590/1500, y: 345/1300, w: 100/1500, h: 190/1300 },
    spawnAreas: []
  },
  {
    id: "ruta-3",
    name: "Ruta 3",
    kind: "grass",
    minimapImageKey: "ruta-3",
    mainMapShape: { type: "rect", x: 680/1500, y: 300/1300, w: 200/1500, h: 80/1300 },
    spawnAreas: []
  },
  {
    id: "monte-moon",
    name: "Monte Moon",
    kind: "cave",
    minimapImageKey: "monte-moon",
    mainMapShape: { type: "rect", x: 820/1500, y: 210/1300, w: 100/1500, h: 100/1300 },
    spawnAreas: []
  },
  {
    id: "ruta-4",
    name: "Ruta 4",
    kind: "grass",
    minimapImageKey: "ruta-4",
    mainMapShape: { type: "rect", x: 880/1500, y: 300/1300, w: 200/1500, h: 75/1300 },
    spawnAreas: []
  },
  {
    id: "ruta-24",
    name: "Ruta 24",
    kind: "grass",
    minimapImageKey: "ruta-24",
    mainMapShape: { type: "rect", x: 1100/1500, y: 240/1300, w: 50/1500, h: 80/1300 },
    spawnAreas: []
  },
  {
    id: "ruta-25",
    name: "Ruta 25",
    kind: "grass",
    minimapImageKey: "ruta-25",
    mainMapShape: { type: "rect", x: 1100/1500, y: 180/1300, w: 220/1500, h: 65/1300 },
    spawnAreas: []
  },
  {
    id: "ruta-9",
    name: "Ruta 9",
    kind: "grass",
    minimapImageKey: "ruta-9",
    mainMapShape: { type: "rect", x: 1150/1500, y: 360/1300, w: 185/1500, h: 65/1300 },
    spawnAreas: []
  },
  {
    id: "ruta-22",
    name: "Ruta 22",
    kind: "grass",
    minimapImageKey: "ruta-22",
    mainMapShape: { type: "rect", x: 400/1500, y: 590/1300, w: 130/1500, h: 75/1300 },
    spawnAreas: []
  },
  {
    id: "tunel-roca",
    name: "Tunel Roca",
    kind: "cave",
    minimapImageKey: "tunel-roca",
    mainMapShape: { type: "rect", x: 1260/1500, y: 470/1300, w: 100/1500, h: 50/1300 },
    spawnAreas: []
  },
  {
    id: "central-energica",
    name: "Central de Energia",
    kind: "city",
    minimapImageKey: "central-energica",
    mainMapShape: { type: "rect", x: 1275/1500, y: 425/1300, w: 80/1500, h: 75/1300 },
    spawnAreas: []
  },
  {
    id: "ruta-8",
    name: "Ruta 8",
    kind: "grass",
    minimapImageKey: "ruta-8",
    mainMapShape: { type: "rect", x: 1160/1500, y: 530/1300, w: 120/1500, h: 70/1300 },
    spawnAreas: []
  },
  {
    id: "ruta-7",
    name: "Ruta 7",
    kind: "grass",
    minimapImageKey: "ruta-7",
    mainMapShape: { type: "rect", x: 1000/1500, y: 530/1300, w: 50/1500, h: 60/1300 },
    spawnAreas: []
  },
  {
    id: "ruta-5",
    name: "Ruta 5",
    kind: "grass",
    minimapImageKey: "ruta-5",
    mainMapShape: { type: "rect", x: 1050/1500, y: 420/1300, w: 60/1500, h: 75/1300 },
    spawnAreas: []
  },
  {
    id: "ruta-6",
    name: "Ruta 6",
    kind: "grass",
    minimapImageKey: "ruta-6",
    mainMapShape: { type: "rect", x: 1050/1500, y: 600/1300, w: 75/1500, h: 50/1300 },
    spawnAreas: [
      {
        id: "ruta-6-grass-norte",
        biome: "grass", method: "grass",
        shape: { type: "rect", x: 0.10, y: 0.28, w: 0.80, h: 0.11 },
        capacity: 10, weight: 1.0
      },
      {
        id: "ruta-6-grass-sur",
        biome: "grass", method: "grass",
        shape: { type: "polygon", points: [
          [0.09,0.44],[0.92,0.44],[0.92,0.54],[0.20,0.54],
          [0.20,0.79],[0.75,0.79],[0.75,0.92],[0.09,0.92]
        ]},
        capacity: 14, weight: 1.2,
        /*anchors: [
          { x:0.20,y:0.50 },{ x:0.20,y:0.70 },{ x:0.40,y:0.90 },{ x:0.60,y:0.90 },
          { x:0.50,y:0.45 },{ x:0.70,y:0.45 },{ x:0.85,y:0.50 },{ x:0.85,y:0.80 }
        ]*/
      },
      {
        id: "ruta-6-lake-rod",
        biome: "lake", method: "rod", rodTier: "old",
        shape: { type: "rect", x: 0.25, y: 0.65, w: 0.4, h: 0.10 },
        capacity: 5, weight: 1.0,
        //anchors: [{ x:0.40,y:0.70 }, { x:0.60,y:0.70 }]
      }
    ]
  },
  {
    id: "ruta-16",
    name: "Ruta 16",
    kind: "grass",
    minimapImageKey: "ruta-16",
    mainMapShape: { type: "rect", x: 760/1500, y: 570/1300, w: 120/1500, h: 100/1300 },
    spawnAreas: []
  },
  {
    id: "ruta-17",
    name: "Ruta 17",
    kind: "grass",
    minimapImageKey: "ruta-17",
    mainMapShape: { type: "rect", x: 760/1500, y: 650/1300, w: 50/1500, h: 250/1300 },
    spawnAreas: []
  },
  {
    id: "ruta-18",
    name: "Ruta 18",
    kind: "grass",
    minimapImageKey: "ruta-18",
    mainMapShape: { type: "rect", x: 760/1500, y: 900/1300, w: 100/1500, h: 60/1300 },
    spawnAreas: []
  },
  {
    id: "ruta-11",
    name: "Ruta 11",
    kind: "grass",
    minimapImageKey: "ruta-11",
    mainMapShape: { type: "rect", x: 1150/1500, y: 650/1300, w: 130/1500, h: 50/1300 },
    spawnAreas: []
  },
  {
    id: "ruta-12",
    name: "Ruta 12",
    kind: "grass",
    minimapImageKey: "ruta-12",
    mainMapShape: { type: "rect", x: 1290/1500, y: 600/1300, w: 50/1500, h: 190/1300 },
    spawnAreas: []
  },
  {
    id: "ruta-13",
    name: "Ruta 13",
    kind: "grass",
    minimapImageKey: "ruta-13",
    mainMapShape: { type: "rect", x: 1150/1500, y: 790/1300, w: 190/1500, h: 50/1300 },
    spawnAreas: []
  },
  {
    id: "ruta-14",
    name: "Ruta 14",
    kind: "grass",
    minimapImageKey: "ruta-14",
    mainMapShape: { type: "rect", x: 1170/1500, y: 830/1300, w: 40/1500, h: 110/1300 },
    spawnAreas: []
  },
  {
    id: "ruta-15",
    name: "Ruta 15",
    kind: "grass",
    minimapImageKey: "ruta-15",
    mainMapShape: { type: "rect", x: 1000/1500, y: 900/1300, w: 170/1500, h: 50/1300 },
    spawnAreas: []
  },
  {
    id: "ruta-19",
    name: "Ruta 19",
    kind: "grass",
    minimapImageKey: "ruta-19",
    mainMapShape: { type: "rect", x: 880/1500, y: 950/1300, w: 60/1500, h: 120/1300 },
    spawnAreas: []
  },
  {
    id: "ruta-20",
    name: "Ruta 20",
    kind: "grass",
    minimapImageKey: "ruta-20",
    mainMapShape: { type: "rect", x: 650/1500, y: 1020/1300, w: 220/1500, h: 60/1300 },
    spawnAreas: []
  },
  {
    id: "ruta-21",
    name: "Ruta 21",
    kind: "grass",
    minimapImageKey: "ruta-21",
    mainMapShape: { type: "rect", x: 580/1500, y: 830/1300, w: 70/1500, h: 180/1300 },
    spawnAreas: []
  }
];
