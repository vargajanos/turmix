-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Sze 25. 08:12
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
('1', 'előétel'),
('2', 'főétel'),
('3', 'köret'),
('4', 'reggeli'),
('5', 'desszert'),
('6', 'vacsora');

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
  `calory` int(11) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `recipes`
--

INSERT INTO `recipes` (`ID`, `userID`, `catID`, `title`, `description`, `time`, `additions`, `calory`, `createdAt`) VALUES
('21880e4b-8444-48b1-9e8b-70462e301e6a', '0362f1a6-c08a-4d7f-875c-819c47adb70e', '3', 'Rizs', 'A rizst vízben megfőzzük, és ízesítjük sóval. Egyszerű köret, ami szinte mindenhez illik.', 20, '200 g rizs, só, víz', 200, '2024-09-23 11:36:22'),
('2e14fc85-123c-43f5-939d-5898c7bb1033', '0362f1a6-c08a-4d7f-875c-819c47adb70e', '1', 'Finom Leves', 'Ez egy ízletes leves elkészítési módja.', 30, 'Hagyma, sárgarépa, krumpli', 250, '2024-09-01 08:36:51'),
('6a29d3e4-7e80-4c68-a5cc-4a60df73f494', '0362f1a6-c08a-4d7f-875c-819c47adb70e', '3', 'Főtt Krumpli', 'A krumplit főzzük meg sós vízben. Kiváló köret húsételekhez.', 30, '300 g krumpli, só, víz', 220, '2024-09-23 11:36:22'),
('a6e5350e-7b3c-4b9f-bfa3-962e2fdf038e', '0362f1a6-c08a-4d7f-875c-819c47adb70e', '2', 'Rakott Krumpli', 'A rakott krumpli rétegesen készül, krumpli, tojás és darált hús felhasználásával. Sütőben készül, és a végén tejföllel van meglocsolva.', 60, '3 db krumpli, 3 db tojás, 300 g darált hús, tejföl', 500, '2024-09-23 11:36:22'),
('bcb9c391-bc04-4c38-9ac8-f87e8c1c5e86', '0362f1a6-c08a-4d7f-875c-819c47adb70e', '1', 'Gulyásleves', 'A gulyásleveshez a húst felkockázzuk, hagymával, paprikával és fűszerekkel főzzük. Hozzáadjuk a burgonyát és a sárgarépát.', 120, '500 g marhahús, 2 db burgonya, 2 db sárgarépa, fűszerek', 600, '2024-09-23 11:36:22'),
('bdbce65b-449e-4481-9c34-e2a760c9d4a0', '0362f1a6-c08a-4d7f-875c-819c47adb70e', '2', 'Töltött Káposzta', 'A töltött káposzta savanyú káposztalevelekbe töltött darált hús és rizs keveréke. Hosszú főzési időt igényel, de megéri!', 180, '800 g darált hús, 300 g rizs, 1 fej káposzta', 700, '2024-09-23 11:36:22'),
('c0e19e9c-b459-43cb-bf11-20487085c028', '0362f1a6-c08a-4d7f-875c-819c47adb70e', '2', 'Lazac Sült Zöldségekkel', 'A lazac filét fűszerezzük, majd sütjük. Kísérjük sült zöldségekkel, mint a cukkini és a paprika.', 45, '2 db lazac filé, 1 db cukkini, 1 db paprika', 400, '2024-09-23 11:36:22'),
('d1f1e4a3-bc71-4e39-8e62-ea68b5aeb2f9', '0362f1a6-c08a-4d7f-875c-819c47adb70e', '1', 'Paradicsomleves', 'A paradicsomleves elkészítése során a hagymát megpirítjuk, majd hozzáadjuk a felkockázott paradicsomokat. Fűszerezzük sóval, borssal és bazsalikommal. Végül botmixerrel pürésítjük.', 30, '2 db paradicsom, 1 db hagyma, só, bors, bazsalikom', 150, '2024-09-23 11:36:22'),
('e5c43b07-550f-4429-8486-215cf2a5f4b8', '0362f1a6-c08a-4d7f-875c-819c47adb70e', '1', 'Brokkoli Krémleves', 'A brokkolit főzzük meg, majd turmixoljuk pürésre. Fűszerezzük sóval és borssal, tejszínt adhatunk hozzá.A brokkolit főzzük meg, majd turmixoljuk pürésre. Fűszerezzük sóval és borssal, tejszínt adhatunk hozzá.A brokkolit főzzük meg, majd turmixoljuk pürésre. Fűszerezzük sóval és borssal, tejszínt adhatunk hozzá.A brokkolit főzzük meg, majd turmixoljuk pürésre. Fűszerezzük sóval és borssal, tejszínt adhatunk hozzá.A brokkolit főzzük meg, majd turmixoljuk pürésre. Fűszerezzük sóval és borssal, tejszínt adhatunk hozzá.A brokkolit főzzük meg, majd turmixoljuk pürésre. Fűszerezzük sóval és borssal, tejszínt adhatunk hozzá.A brokkolit főzzük meg, majd turmixoljuk pürésre. Fűszerezzük sóval és borssal, tejszínt adhatunk hozzá.A brokkolit főzzük meg, majd turmixoljuk pürésre. Fűszerezzük sóval és borssal, tejszínt adhatunk hozzá.sóval és borssal, tejszínt adhatunk hozzá.A brokkolit főzzük meg, majd turmixoljuk pürésre. Fűszerezzük sóval és borssal, tejszínt adhatunk hozzá.A brokkolit főzzük meg, majd turmixoljuk pürésre. Fűszerezzük sóval és borssal, tejszínt adhatunk hozzá.A brokkolit főzzük meg, majd turmixoljuk pürésre. Fűszerezzük sóval és borssal, tejszínt adhatunk hozzá.A brokkolit főzzük meg, majd turmixoljuk pürésre. Fűszerezzük sóval és borssal, tejszínt adhatunk hozzá.A brokkolit főzzük meg, majd turmixoljuk pürésre. Fűszerezzük sóval és borssal, tejszínt adhatunk hozzá.', 30, '300 g brokkoli, 200 ml tejszín, só, bors', 180, '2024-09-23 11:36:22'),
('f743f597-6d98-44d7-8aa0-f5a8ebde59c5', '0362f1a6-c08a-4d7f-875c-819c47adb70e', '3', 'Sült Zöldségek', 'A zöldségeket felkockázzuk, olívaolajjal megöntözzük, majd sütőben sütjük. Ideális köret grillezett húsokhoz.', 40, '1 db paprika, 1 db cukkini, 2 db sárgarépa, olívaolaj', 250, '2024-09-23 11:36:22');

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
