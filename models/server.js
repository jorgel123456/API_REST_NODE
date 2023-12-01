const express = require("express");
const cors=require("cors");
const { dbConnection } = require("../database/config");


class Server {

        constructor (){
            this.app=express();
            this.port=process.env.PORT;
            this.usuriosPath='/api/usuarios';

            //conexion a la base de datos 
            this.conectarDB();

            //Middlewares
            this.middlewares();
                
            //rutas de la aplicacion
            this.routes();

        }

        //funcion para conectar la base de datos
        async conectarDB(){
            await dbConnection();
        }


        middlewares(){
            this.app.use(cors());

            //lectura y parseo del body
            this.app.use( express.json());

            //directorio publico
            this.app.use(express.static('public'));
        }
        routes(){
           this.app.use(this.usuriosPath,require('../routes/usuarios'))
        }

        listen(){
            this.app.listen(this.port,()=>{
                console.log(`servidor corriendo en el puerto ${this.port}`)
            });
        }

}

module.exports= Server;