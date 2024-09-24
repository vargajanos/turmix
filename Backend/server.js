require('dotenv').config();
const express = require('express');
var mysql = require('mysql');
const uuid = require('uuid');
var cors = require('cors');
var CryptoJS = require("crypto-js");
var moment = require('moment');
 
const app = express();
const port = process.env.PORT;
const passwdRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
 
// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
 
var pool  = mysql.createPool({
  connectionLimit : process.env.CONNECTIONLIMIT,
  host            : process.env.DBHOST,
  user            : process.env.DBUSER,
  password        : process.env.DBPASS,
  database        : process.env.DBNAME
});
 
// get API version
app.get('/', (req, res) => {
    res.send(`API version : ${process.env.VERSION}`);
  });
 
 
// USER MŰVELETEK
 
//regisztráció
app.post('/reg', (req, res) => {
 
    // kötelező adatok ellenőrzése
 
    if (!req.body.name || !req.body.email || !req.body.phone || !req.body.passwd || !req.body.confirm ){
 
       res.status(203).send('Nem adtál meg minden kötelező adatot!');
       return;
    }
 
    // jelszavak ellenőrzése
    if (req.body.passwd != req.body.confirm){
      res.status(203).send('A megadott jelszavak nem egyeznek!');
      return;
    }
   
    // jelszó min kritériumoknak megfelelés
    if (!req.body.passwd.match(passwdRegExp)){
      res.status(203).send('A jelszó nem elég biztonságos!');
      return;
    }
 
    // email cím ellenőrzés
    pool.query(`SELECT * FROM users WHERE email='${req.body.email}'`, (err, results) => {
       
      if (err){
        res.status(500).send('Hiba történt az adatbázis elérése közben!');
        return;
       }
     
      // ha van már ilyen email cím
      if (results.length != 0){
        res.status(203).send('Ez az e-mail cím már regisztrálva van!');
        return;
       }
 
       pool.query(`SELECT * FROM users WHERE name='${req.body.name}'`, (err, results) => {
       
        if (err){
          res.status(500).send('Hiba történt az adatbázis elérése közben!');
          return;
         }
       
        // ha van már ilyen email cím
        if (results.length != 0){
          res.status(203).send('Ez a felhasználónév cím már regisztrálva van!');
          return;
         }
 
     
      // új felhasználó felvétele
      pool.query(`INSERT INTO users VALUES('${uuid.v4()}', '${req.body.name}', '${req.body.email}', '${req.body.phone}', SHA1('${req.body.passwd}'), 'user', '1')`, (err, results)=>{
        if (err){
          res.status(500).send('Hiba történt az adatbázis művelet közben!');
          return;
         }
         res.status(202).send('A regisztráció sikeres!');
         return;
      });
      return;
    });
   
  });
})
 
  //belépés
app.post('/login', (req, res) => {
 

    console.log(req.body);
    if (!req.body.name || !req.body.passwd) {
      res.status(203).send('Hiányzó adatok!');
      return;
    }
 
    pool.query(`SELECT ID, name, email, phone, role, status FROM users WHERE name ='${req.body.name}' AND passwd='${CryptoJS.SHA1(req.body.passwd)}'`, (err, results) =>{
      if (err){
        res.status(500).send('Hiba történt az adatbázis lekérés közben!');
        return;
      }
      if (results.length == 0){
        res.status(203).send('Hibás belépési adatok!');
        return;
      }
      res.status(202).send(results);
      return;
    });
 
  });

  // felhasználók listája (CSAK ADMIN)
app.get('/users', (req, res) => {

  //TODO: csak admin joggal lehet - később

  pool.query(`SELECT ID, name, email, role FROM users`, (err, results) => {
    if (err){
      res.status(500).send('Hiba történt az adatbázis lekérés közben!');
      return;
    }
    res.status(200).send(results);
    return;
  });
});

 
// felhasználó adatainak lekérése id alapján (CSAK ADMIN)
app.get('/users/:id', logincheck, (req, res) => {
 
  if (!req.params.id) {
     res.status(203).send('Hiányzó azonosító!');
     return;
   }
 
   pool.query(`SELECT name, email,phone, role, status FROM users WHERE ID='${req.params.id}'`, (err, results) =>{
     if (err){
       res.status(500).send('Hiba történt az adatbázis lekérés közben!');
       return;
     }
 
     if (results.length == 0){
       res.status(203).send('Hibás azonosító!');
       return;
     }
 
     res.status(202).send(results);
     return;
 
   });
 });
 
//_____________________
function logincheck(req, res, next){
  let token = req.header('Authorization');
 
  if (!token){
    res.status(400).send('Jelentkezz be!');
    return;
  }
 
  pool.query(`SELECT * FROM users WHERE ID='${token}'`, (err, results) => {
    if (results.length == 0){
      res.status(400).send('Hibás authentikáció!');
      return;
    }
 
    next();
  });
 
  return;
}
 
// felhasználó törlése id alapján (CSAK ADMIN)
app.delete('/users/:id', logincheck, (req, res) => {
 
  if (!req.params.id) {
    res.status(203).send('Hiányzó azonosító!');
    return;
  }
 
  pool.query(`DELETE FROM users WHERE ID='${req.params.id}'`, (err, results) => {
   
    if (err){
      res.status(500).send('Hiba történt az adatbázis lekérés közben!');
      return;
    }
   
    if (results.affectedRows == 0){
      res.status(203).send('Hibás azonosító!');
      return;
    }
 
    res.status(200).send('Felhasználó törölve!');
    return;
 
  });
});
 
 
 
 
 
// DATA MŰVELETEK

 
// receptek kategóriák szerint - ok
app.get('/recipes/:catID' ,(req, res) => {
  if (!req.params.catID) {
    res.status(203).send('Hiányzó azonosító!');
    return;
  }
 
  pool.query(`SELECT * FROM recipes WHERE catID='${req.params.catID}'`, (err, results) => {
    if (err){
      res.status(500).send('Hiba történt az adatbázis lekérés közben!');
      return;
    }
 
    res.status(200).send(results);
    return;
 
  });
 
});
 
// receptek törlése - ok

app.delete('/recipes/:id',(req, res) => {
  if (!req.params.id) {
    res.status(203).send('Hiányzó azonosító!');
    return;
  }

  pool.query(`DELETE FROM recipes WHERE ID='${req.params.id}'`, (err, results) => {
    
    if (err){
      res.status(500).send('Hiba történt az adatbázis lekérés közben!');
      return;
    }
    
    if (results.affectedRows == 0){
      res.status(203).send('Hibás azonosító!');
      return;
    }

    res.status(200).send('Recept törölve!');
    return;

  });
});


// receptek módosítása - ok

app.patch('/recipes/:id',(req, res) => {
  
  if (!req.params.id) {
    res.status(203).send('Hiányzó azonosító!');
    return;
  }

  if (!req.body.title || !req.body.description || !req.body.time || !req.body.additions || !req.body.calory) {
    res.status(203).send('Hiányzó adatok!');
    return;
  }

  pool.query(`UPDATE recipes SET title='${req.body.title}', description='${req.body.description}', time='${req.body.time}', additions='${req.body.additions}', calory='${req.body.calory}' WHERE ID='${req.params.id}'`, (err, results) => {
    if (err){
      res.status(500).send('Hiba történt az adatbázis lekérés közben!');
      return;
    }

    if (results.affectedRows == 0){
      res.status(203).send('Hibás azonosító!');
      return;
    }

    res.status(200).send('Recept adatok módosítva!');
    return;
  });
});


// saját recept felvétele - ok

app.post('/recipes/:userID', (req, res) => {
  if (!req.params.userID) {
    res.status(400).send('Hiányzó azonosító!'); // 400-as státuszkód a hibás kéréshez
    return;
  }
 
  const { catID, title, description, time, additions, calory } = req.body;
 
  pool.query(
    `INSERT INTO recipes (ID, userID, catID, title, description, time, additions, calory) VALUES ('${uuid.v4()}', '${req.params.userID}', '${catID}', '${title}', '${description}', '${time}', '${additions}', ${calory})`,
    (err) => {
      if (err) {
        console.error('Hiba:', err); // Hibakereséshez hasznos lehet
        res.status(500).send('Hiba történt az adatbázis lekérés közben!');
        return;
      }
 
      res.status(201).send('Sikeres felvétel!'); // 201 a sikeres létrehozáshoz
    }
  );
});

// felhasználó módosítása

app.patch('/users/:id', logincheck,(req, res) => {
  
  if (!req.params.id) {
    res.status(203).send('Hiányzó azonosító!');
    return;
  }

  if (!req.body.name || !req.body.email || !req.body.role) {
    res.status(203).send('Hiányzó adatok!');
    return;
  }

  //TODO: ne módosíthassa már meglévő email címre az email címét

  pool.query(`UPDATE users SET name='${req.body.name}', email='${req.body.email}', role='${req.body.role}' WHERE ID='${req.params.id}'`, (err, results) => {
    if (err){
      res.status(500).send('Hiba történt az adatbázis lekérés közben!');
      return;
    }

    if (results.affectedRows == 0){
      res.status(203).send('Hibás azonosító!');
      return;
    }

    res.status(200).send('Felhasználó adatok módosítva!');
    return;
  });
});


app.get('/users', logincheck, (req, res) => {

  //TODO: csak admin joggal lehet - később

  pool.query(`SELECT ID, name, email, role FROM users`, (err, results) => {
    if (err){
      res.status(500).send('Hiba történt az adatbázis lekérés közben!');
      return;
    }
    res.status(200).send(results);
    return;
  });
});
 

app.get('/me/:id', logincheck,(req, res) => {
  //TODO: id-t megoldani backenden majd, hogy ne kelljen itt átadni
   if (!req.params.id) {
     res.status(203).send('Hiányzó azonosító!');
     return;
   }
 
   pool.query(`SELECT name, email, role, phone FROM users WHERE ID='${req.params.id}'`, (err, results) =>{ 
     if (err){
       res.status(500).send('Hiba történt az adatbázis lekérés közben!');
       return;
     }
 
     if (results.length == 0){
       res.status(203).send('Hibás azonosító!');
       return;
     }
 
     res.status(202).send(results);
     return;
 
   });
 });



// jogosultság ellenőrzése
function admincheck(req, res, next){
  let token = req.header('Authorization');
  
  if (!token){
    res.status(400).send('Jelentkezz be!');
    return;
  }

  pool.query(`SELECT role FROM users WHERE ID='${token}'`, (err, results) => {
    if (results.length == 0){
      res.status(400).send('Hibás authentikáció!');
      return;
    } 
    if (results[0].role != 'admin'){
      res.status(400).send('Nincs jogosultságod!');
      return;
    }
    next();
  });

  return;
}
  // felhasználók listája (CSAK ADMIN)
  app.get('/recipes', (req, res) => {

    
  
    pool.query(`SELECT * FROM recipes`, (err, results) => {
      if (err){
        res.status(500).send('Hiba történt az adatbázis lekérés közben!');
        return;
      }
      res.status(200).send(results);
      return;
    });
  });



  app.get('/recipes/:id', (req, res) => {

    if (!req.params.id) {
      res.status(203).send('Hiányzó azonosító!');
      return;
    }
  
    pool.query(`SELECT * FROM recipes WHERE ID='${req.params.id}'`, (err, results) => {
      if (err){
        res.status(500).send('Hiba történt az adatbázis lekérés közben!');
        return;
      }
      res.status(200).send(results);
      return;
    });
  });


app.listen(port, () => {
  //console.log(process.env) ;
  console.log(`Server listening on port ${port}...`);
});