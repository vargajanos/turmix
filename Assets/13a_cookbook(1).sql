-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Sze 23. 09:13
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `13a_cookbook`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `categories`
--

CREATE TABLE `categories` (
  `ID` varchar(40) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `categories`
--

INSERT INTO `categories` (`ID`, `name`) VALUES
('1', 'leves'),
('2', 'főétel'),
('3', 'köret');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `recipes`
--

CREATE TABLE `recipes` (
  `ID` varchar(40) NOT NULL,
  `userID` varchar(40) NOT NULL,
  `catID` varchar(40) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `time` int(11) NOT NULL,
  `additions` text NOT NULL,
  `calory` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `recipes`
--

INSERT INTO `recipes` (`ID`, `userID`, `catID`, `title`, `description`, `time`, `additions`, `calory`) VALUES
('3f45a7e8-fb3b-4c52-86d4-11b9c60e1f14', '0362f1a6-c08a-4d7f-875c-819c47adb70e', '3', 'Párolt rizs', 'Egyszerű párolt rizs köretként bármilyen ételhez.', 30, 'Rizs, víz, só, olaj', 200),
('a97f9a59-71d7-4e6a-bf92-8c0c8f81dbda', '0362f1a6-c08a-4d7f-875c-819c47adb70e', '1', 'Gulyásleves', 'Tradicionális magyar gulyás marhahúsból.', 150, 'Marhahús, krumpli, sárgarépa, hagyma, pirospaprika', 350),
('b7a3ae1d-f8c2-4fd1-8d0e-4fdcc1a7dd9a', '0362f1a6-c08a-4d7f-875c-819c47adb70e', '3', 'Párolt zöldség', 'Friss zöldségek párolva, könnyű köretként.', 20, 'Brokkoli, répa, karfiol, olívaolaj, só', 180),
('c9c621a1-7408-4576-91a4-759a39db8ae4', '0362f1a6-c08a-4d7f-875c-819c47adb70e', '2', 'Marhapörkölt', 'Lassan főzött marhapörkölt paprika és hagyma alapon.', 180, 'Marhahús, vöröshagyma, pirospaprika, paradicsom, paprika', 450),
('d36fa9f9-bfb5-44b4-9fa8-bd5a6a70a547', '0362f1a6-c08a-4d7f-875c-819c47adb70e', '2', 'Lecsó', 'Magyar lecsó kolbásszal és paprikával.', 60, 'Kolbász, paprika, paradicsom, hagyma, tojás', 320),
('d8b9e4b4-bf6e-4a58-bc2d-6c90d1e1b1e4', '0362f1a6-c08a-4d7f-875c-819c47adb70e', '1', 'Húsleves', 'Hagyományos magyar húsleves zöldségekkel és tésztával.', 120, 'Csirkehús, répa, zeller, petrezselyem, tészta', 300),
('e63e1e63-17df-4e8d-bc19-542bc5b73e2c', '0362f1a6-c08a-4d7f-875c-819c47adb70e', '3', 'Rántott krumpli', 'Sült krumpli ropogósra sütve.', 30, 'Krumpli, olaj, só', 250),
('ed2f84d5-e5d2-47a2-b9f6-4cf07d7d8a63', '0362f1a6-c08a-4d7f-875c-819c47adb70e', '2', 'Sült csirke', 'Ropogós bőrű sült csirke burgonyával.', 90, 'Csirkecomb, burgonya, fokhagyma, olaj, fűszerek', 400),
('f00a2a68-0ef3-4774-8d58-d9fbe1d594d1', '0362f1a6-c08a-4d7f-875c-819c47adb70e', '2', 'Paprikás krumpli', 'Klasszikus paprikás krumpli kolbásszal.', 75, 'Krumpli, kolbász, pirospaprika, hagyma', 400),
('f77f8a7a-7ef1-4939-9c72-d8f6b7cce482', '0362f1a6-c08a-4d7f-875c-819c47adb70e', '1', 'Zöldségleves', 'Friss zöldségekből készült könnyű leves.', 45, 'Répa, borsó, zeller, karfiol, brokkoli', 150);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `ID` varchar(40) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `passwd` varchar(40) NOT NULL,
  `role` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`ID`, `name`, `email`, `phone`, `passwd`, `role`, `status`) VALUES
('0362f1a6-c08a-4d7f-875c-819c47adb70e', 'konrad', 'konrad@gmail.com', '06705425392', 'a8654e60799a800c31b25bb938743f0fc57ca1df', 'admin', 1),
('3d16b41f-924e-403c-9b1a-cca7b6ad5ee9', 'csurmi', 'csurmi02', '067060950208', '6ec520265e0330296e27d9b5da0d052a0af350e2', 'user', 1),
('a64638e2-2ecb-4b4a-b8d6-0e5f1e54630e', 'csalalmade', 'csurmi@gmail.com', '06705656569489', 'bb80013e4b83b6b47713a77a4a773cbf90ddc47f', 'user', 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `catID` (`catID`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `recipes_ibfk_2` FOREIGN KEY (`catID`) REFERENCES `categories` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
