-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-04-2023 a las 14:51:48
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbtiendahardwarenodejs`
--
CREATE DATABASE IF NOT EXISTS `dbtiendahardwarenodejs` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `dbtiendahardwarenodejs`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`) VALUES
(1, 'Procesador'),
(2, 'Tarjeta Grafica'),
(3, 'Gabinete'),
(4, 'Placa Madre');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id` int(11) NOT NULL,
  `ciudad` varchar(255) NOT NULL,
  `comuna` varchar(255) NOT NULL,
  `calle` varchar(255) NOT NULL,
  `coste` double NOT NULL,
  `estado` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id`, `ciudad`, `comuna`, `calle`, `coste`, `estado`, `fecha`, `hora`, `usuario_id`) VALUES
(1, 'San Antonio', 'Cartagena', 'Mariano Casanova 392', 1768032, 'En preparación', '2022-01-31', '01:24:22', 2),
(2, 'Valparaiso', 'Viña del Mar', 'Avenida Vicuña Mackenna 812', 601400, 'Confirmado', '2022-01-31', '01:27:19', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `precio` double NOT NULL,
  `stock` int(11) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `categoria_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `imagen`, `categoria_id`) VALUES
(1, 'AMD A6-9500E', 'Socket: AM4;Frecuencia: 3000 Mhz;Nucleos: 2', 34990, 10, 'AMD A6-9500E (AM4) (3000MHz) (2).png', 1),
(2, 'AMD Ryzen 5 2600X', 'Socket: AM4;Frecuencia: 3600 Mhz;Nucleos: 6', 153000, 21, 'AMD Ryzen 5 2600X (AM4) (3600MHz) (6).png', 1),
(3, 'AMD Ryzen 5 3400G', 'Socket: AM4;Frecuencia: 3700 Mhz;Nucleos: 4', 127000, 15, 'AMD Ryzen 5 3400G (AM4) (3700MHz) (4).png', 1),
(4, 'AMD Ryzen 5 3500X', 'Socket: AM4;Frecuencia: 3600 Mhz;Nucleos: 6', 172000, 36, 'AMD Ryzen 5 3500X (AM4) (3600MHz) (6).png', 1),
(5, 'AMD Ryzen 5 3600', 'Socket: AM4;Frecuencia: 3600 Mhz;Nucleos: 6', 195345, 44, 'AMD Ryzen 5 3600 (AM4) (3600MHz) (6).png', 1),
(6, 'AMD Ryzen 5 3600X', 'Socket: AM4;Frecuencia: 3800 Mhz;Nucleos: 6', 205000, 24, 'AMD Ryzen 5 3600X (AM4) (3800MHz) (6).png', 1),
(7, 'AMD Ryzen 5 5600X', 'Socket: AM4;Frecuencia: 3700 Mhz;Nucleos: 6', 221900, 43, 'AMD Ryzen 5 5600X (AM4) (3700MHz) (6).png', 1),
(8, 'AMD Ryzen 7 2700X', 'Socket: AM4;Frecuencia: 3700 Mhz;Nucleos: 8', 200000, 32, 'AMD Ryzen 7 2700X (AM4) (3700MHz) (8).png', 1),
(9, 'AMD Ryzen 7 3700X', 'Socket: AM4;Frecuencia: 3600 Mhz;Nucleos: 8', 325900, 71, 'AMD Ryzen 7 3700X (AM4) (3600MHz) (8).png', 1),
(10, 'AMD Ryzen 7 3800XT', 'Socket: AM4;Frecuencia: 3900 Mhz;Nucleos: 8', 401780, 38, 'AMD Ryzen 7 3800XT (AM4) (3900MHz) (8).png', 1),
(11, 'AMD Ryzen 7 5800X', 'Socket: AM4;Frecuencia: 3800 Mhz;Nucleos: 8', 382750, 9, 'AMD Ryzen 7 5800X (AM4) (3800MHz) (8).png', 1),
(12, 'AMD Ryzen 9 3900X', 'Socket: AM4;Frecuencia: 3800 Mhz;Nucleos: 12', 542000, 22, 'AMD Ryzen 9 3900X (AM4) (3800MHz) (12).png', 1),
(13, 'AMD Ryzen 9 3900XT', 'Socket: AM4;Frecuencia: 3800 Mhz;Nucleos: 12', 526000, 34, 'AMD Ryzen 9 3900XT (AM4) (3800MHz) (12).png', 1),
(14, 'AMD Ryzen 9 5900X', 'Socket: AM4;Frecuencia: 3700 Mhz;Nucleos: 12', 602135, 78, 'AMD Ryzen 9 5900X (AM4) (3700MHz) (12).png', 1),
(15, 'AMD Ryzen 9 5950X', 'Socket: AM4;Frecuencia: 3400 Mhz;Nucleos: 16', 622570, 31, 'AMD Ryzen 9 5950X (AM4) (3400MHz) (16).png', 1),
(16, 'AMD Ryzen Threadripper 3990X', 'Socket: AM4;Frecuencia: 2900 Mhz;Nucleos: 64', 3401780, 9, 'AMD Ryzen Threadripper 3990X (sTRX4) (2900MHz) (64).png', 1),
(17, 'AMD Sempron 2650', 'Socket: FS1b;Frecuencia: 1450 Mhz;Nucleos: 2', 19990, 10, 'AMD Sempron 2650 (FS1b) (1450MHz) (2).png', 1),
(18, 'Intel Celeron G1820', 'Socket: LGA 1150;Frecuencia: 2700 Mhz;Nucleos: 2', 23000, 4, 'Intel Celeron G1820 (LGA 1150) (2700MHz) (2).png', 1),
(19, 'Intel Core i3-4170', 'Socket: LGA 1150;Frecuencia: 3700 Mhz;Nucleos: 2', 55000, 34, 'Intel Core i3-4170 (LGA 1150) (3700MHz) (2).png', 1),
(20, 'Intel Core i3-9100', 'Socket: LGA 1151;Frecuencia: 3600 Mhz;Nucleos: 4', 83000, 15, 'Intel Core i3-9100 (LGA 1151) (3600MHz) (4).png', 1),
(21, 'Intel Core i3-10100', 'Socket: LGA 1200;Frecuencia: 3600 Mhz;Nucleos: 4', 102350, 89, 'Intel Core i3-10100 (LGA 1200) (3600MHz) (4).png', 1),
(22, 'Intel Core i3-10105F', 'Socket: LGA 1200;Frecuencia: 3700 Mhz;Nucleos: 4', 98670, 67, 'Intel Core i3-10105F (LGA 1200) (3700MHz) (4).png', 1),
(23, 'Intel Core i5-8400', 'Socket: LGA 1151;Frecuencia: 2800 Mhz;Nucleos: 6', 168000, 134, 'Intel Core i5-8400 (LGA 1151) (2800MHz) (6).png', 1),
(24, 'Intel Core i5-10400F', 'Socket: LGA 1200;Frecuencia: 2900 Mhz;Nucleos: 6', 255000, 45, 'Intel Core i5-10400F (LGA 1200) (2900MHz) (6).png', 1),
(25, 'Intel Core i5-10600K', 'Socket: LGA 1200;Frecuencia: 4100 Mhz;Nucleos: 6', 298000, 81, 'Intel Core i5-10600K (LGA 1200) (4100MHz) (6).png', 1),
(26, 'Intel Core i5-11400F', 'Socket: LGA 1200;Frecuencia: 2600 Mhz;Nucleos: 6', 305000, 10, 'Intel Core i5-11400F (LGA 1200) (2600MHz) (6).png', 1),
(27, 'Intel Core i7-10700F', 'Socket: LGA 1200;Frecuencia: 2900 Mhz;Nucleos: 8', 493000, 64, 'Intel Core i7-10700F (LGA 1200) (2900MHz) (8).png', 1),
(28, 'Intel Core i7-10700K Avengers Edition', 'Socket: LGA 1200;Frecuencia: 3800 Mhz;Nucleos: 8', 562000, 4, 'Intel Core i7-10700K Avengers Edition (LGA 1200) (3800MHz) (8).png', 1),
(29, 'Intel Core i7-11700K', 'Socket: LGA 1200;Frecuencia: 3600 Mhz;Nucleos: 8', 486320, 17, 'Intel Core i7-11700K (LGA 1200) (3600MHz) (8).png', 1),
(30, 'Intel Core i9-7940X', 'Socket: LGA 2066;Frecuencia: 3100 Mhz;Nucleos: 14', 726000, 25, 'Intel Core i9-7940X (LGA 2066) (3100MHz) (14).png', 1),
(31, 'Intel Core i9-9900', 'Socket: LGA 1151;Frecuencia: 3100 Mhz;Nucleos: 8', 507340, 22, 'Intel Core i9-9900 (LGA 1151) (3100MHz) (8).png', 1),
(32, 'Intel Core i9-9900X', 'Socket: LGA 2066;Frecuencia: 3500 Mhz;Nucleos: 10', 678990, 34, 'Intel Core i9-9900X (LGA 2066) (3500MHz) (10).png', 1),
(33, 'Intel Pentium G3220', 'Socket: LGA 1150;Frecuencia: 3000 Mhz;Nucleos: 2', 34000, 25, 'Intel Pentium G3220 (LGA 1150) (3000MHz) (2).png', 1),
(34, 'Intel Pentium Gold G6400', 'Socket: LGA 1200;Frecuencia: 4000 Mhz;Nucleos: 2', 42000, 55, 'Intel Pentium Gold G6400 (LGA 1200) (4000MHz) (2).png', 1),
(35, 'AMD Radeon Pro WX 3200', 'Memoria: 4 GB GDDR5;Frecuencia: 1295 MHz;Bus: PCI Express 3.0', 327000, 32, 'AMD Radeon Pro WX 3200 (4 GB GDDR5) (1295 MHz) (3.0).png', 2),
(36, 'ASRock AMD Radeon RX550', 'Memoria: 4 GB GDDR5;Frecuencia: 1183 MHz;Bus: PCI Express 3.0', 98000, 78, 'ASRock AMD Radeon RX550 (4 GB GDDR5) (1183 MHz) (3.0).png', 2),
(37, 'ASUS AMD MINING RX 470', 'Memoria: 4 GB GDDR5;Frecuencia: 926 MHz;Bus: PCI Express 3.0', 169000, 32, 'ASUS AMD MINING RX 470 (4 GB GDDR5) (926 MHz) (3.0).png', 2),
(38, 'ASUS Nvidia GeForce GTX 1660 Super', 'Memoria: 6 GB GDDR6;Frecuencia: 1530 MHz;Bus: PCI Express 3.0', 262000, 11, 'ASUS Nvidia GeForce GTX 1660 Super (6 GB GDDR6) (1530 MHz) (3.0).png', 2),
(39, 'ASUS Nvidia GT 710', 'Memoria: 1 GB GDDR5;Frecuencia: 954 MHz;Bus: PCI Express 2.0', 55320, 25, 'ASUS Nvidia GT 710 (1 GB GDDR5) (954 MHz) (2.0).png', 2),
(40, 'ASUS ROG STRIX AMD Radeon RX 6900 XT', 'Memoria: 16 GB GDDR6;Frecuencia: 1825 MHz;Bus: PCI Express 4.0', 673000, 97, 'ASUS ROG STRIX AMD Radeon RX 6900 XT (16 GB GDDR6) (1825 MHz) (4.0).png', 2),
(41, 'ASUS ROG STRIX Nvidia GeForce RTX 2080 Ti', 'Memoria: 11 GB GDDR6;Frecuencia: 1545 MHz;Bus: PCI Express 3.0', 825670, 17, 'ASUS ROG STRIX Nvidia GeForce RTX 2080 Ti (11 GB GDDR6) (1545 MHz) (3.0).png', 2),
(42, 'ASUS ROG STRIX Nvidia GeForce RTX 3060', 'Memoria: 12 GB GDDR6;Frecuencia: 1521 MHz;Bus: PCI Express 3.0', 484325, 56, 'ASUS ROG STRIX Nvidia GeForce RTX 3060 (12 GB GDDR6) (1521 MHz) (3.0).png', 2),
(43, 'ASUS TUF Nvidia GeForce RTX 3060', 'Memoria: 12 GB GDDR6;Frecuencia: 1320 MHz;Bus: PCI Express 3.0', 475000, 19, 'ASUS TUF Nvidia GeForce RTX 3060 (12 GB GDDR6) (1320 MHz) (3.0).png', 2),
(44, 'ECS Nvidia GT 220', 'Memoria: 1 GB DDR3;Frecuencia: 625 MHz;Bus: PCI Express 2.0', 32000, 39, 'ECS Nvidia GT 220 (1GB DDR3) (625 MHz) (2.0).png', 2),
(45, 'EVGA Nvidia GeForce GT 1030', 'Memoria: 2 GB GDDR5;Frecuencia: 1227 MHz;Bus: PCI Express 3.0', 75990, 41, 'EVGA Nvidia GeForce GT 1030 (2 GB GDDR5) (1227 MHz) (3.0).png', 2),
(46, 'EVGA Nvidia GeForce GTX 1650', 'Memoria: 4 GB GDDR6;Frecuencia: 1530 MHz;Bus: PCI Express 3.0', 164440, 4, 'EVGA Nvidia GeForce GTX 1650 (4 GB GDDR6) (1530 MHz) Super (3.0).png', 2),
(47, 'Gigabyte Nvidia GT 710', 'Memoria: 4 GB GDDR5;Frecuencia: 921 MHz;Bus: PCI Express 2.0', 43670, 36, 'Gigabyte Nvidia GT 710 (4 GB GDDR5) (921 MHz) (2.0).png', 2),
(48, 'MSI AMD Radeon RX 570', 'Memoria: 8 GB GDDR5;Frecuencia: 1324 MHz;Bus: PCI Express 3.0', 205990, 31, 'MSI AMD Radeon RX 570 (8 GB GDDR5) (1324 MHz) (3.0).png', 2),
(49, 'MSI AMD Radeon RX 6700 XT', 'Memoria: 12 GB GDDR6;Frecuencia: 2321 MHz;Bus: PCI Express 4.0', 543300, 94, 'MSI AMD Radeon RX 6700 XT (12 GB GDDR6) (2321 MHz) (4.0).png', 2),
(50, 'MSI AMD Radeon RX 6700 XT GAMING X', 'Memoria: 12 GB GDDR6;Frecuencia: 2000 MHz;Bus: PCI Express 4.0', 578900, 56, 'MSI AMD Radeon RX 6700 XT GAMING X (12 GB GDDR6) (2000 MHz) (4.0).png', 2),
(51, 'MSI AMD Radeon RX 6800', 'Memoria: 12 GB GDDR6;Frecuencia: 1815 MHz;Bus: PCI Express 4.0', 431000, 2, 'MSI AMD Radeon RX 6800 (12 GB GDDR6) (1815 MHz) (4.0).png', 2),
(52, 'MSI Nvidia GeForce GT 730', 'Memoria: 2 GB DDR3;Frecuencia: 700 MHz;Bus: PCI Express 2.0', 78990, 74, 'MSI Nvidia GeForce GT 730 (2 GB DDR3) (700 MHz) (2.0).png', 2),
(53, 'MSI Nvidia GeForce RTX 3060 GAMING X', 'Memoria: 12 GB GDDR6;Frecuencia: 1320 MHz;Bus: PCI Express 3.0', 374000, 11, 'MSI Nvidia GeForce RTX 3060 GAMING X (12 GB GDDR6) (1320 MHz) (3.0).png', 2),
(54, 'PowerColor AMD Radeon RX 550', 'Memoria: 4 GB GDDR5;Frecuencia: 1300 MHz;Bus: PCI Express 3.0', 105310, 47, 'PowerColor AMD Radeon RX 550 (4 GB GDDR5) (1300 MHz) (3.0).png', 2),
(55, 'Sapphire NITRO AMD Radeon RX 6700 XT', 'Memoria: 12 GB GDDR6;Frecuencia: 2321 MHz;Bus: PCI Express 4.0', 399900, 35, 'Sapphire NITRO AMD Radeon RX 6700 XT (12 GB GDDR6) (2321 MHz)(4.0).png', 2),
(56, 'Sapphire PULSE AMD Radeon RX 6700 XT', 'Memoria: 12 GB GDDR6;Frecuencia: 2321 MHz;Bus: PCI Express 3.0', 415600, 13, 'Sapphire PULSE AMD Radeon RX 6700 XT (12 GB GDDR6) (2321 MHz) (3.0).png', 2),
(57, 'XFX AMD Radeon RX 570', 'Memoria: 8 GB GDDR5;Frecuencia: 1168 MHz;Bus: PCI Express 3.0', 189220, 28, 'XFX AMD Radeon RX 570 (8 GB GDDR5) (1168 MHz) (3.0).png', 2),
(58, 'XFX AMD Radeon RX 580', 'Memoria: 8 GB GDDR5;Frecuencia: 1257 MHz;Bus: PCI Express 3.0', 231770, 28, 'XFX AMD Radeon RX 580 (8 GB GDDR5) (1257 MHz) (3.0).png', 2),
(59, 'Yeston AMD Radeon RX 550', 'Memoria: 4 GB GDDR5;Frecuencia: 1100 MHz;Bus: PCI Express 3.0', 99450, 16, 'Yeston AMD Radeon RX 550 (4 GB GDDR5) (1100 MHz) (3.0).png', 2),
(60, 'Zotac Nvidia GeForce GTX 1660', 'Memoria: 6 GB GDDR5;Frecuencia: 1530 MHz;Bus: PCI Express 3.0', 278660, 69, 'Zotac Nvidia GeForce GTX 1660 (6 GB GDDR6) (1530 MHz) (3.0).png', 2),
(61, 'Zotac Nvidia GeForce RTX 2060', 'Memoria: 6 GB GDDR6;Frecuencia: 1365 MHz;Bus: PCI Express 3.0', 291330, 65, 'Zotac Nvidia GeForce RTX 2060 (6 GB GDDR6) (1365 MHz) (3.0).png', 2),
(62, 'Zotac Nvidia GeForce RTX 3060', 'Memoria: 12 GB GDDR6;Frecuencia: 1320 MHz;Bus: PCI Express 3.0', 341890, 52, 'Zotac Nvidia GeForce RTX 3060 (12 GB GDDR6) (1320 MHz) (3.0).png', 2),
(63, 'Aerocool Mecha', 'Marca: Aerocool;Modelo: Mecha;Formato: ATX;Panel lateral: Acrilico', 32052, 32, 'Aerocool (Mecha) ATX (Acrilico).png', 3),
(64, 'Aerocool Prime', 'Marca: Aerocool;Modelo: Prime;Formato: ATX;Panel lateral: Vidrio templado', 45212, 12, 'Aerocool (Prime) ATX (Vidrio templado).png', 3),
(65, 'Aerocool Streak', 'Marca: Aerocool;Modelo: Streak;Formato: ATX;Panel lateral: Acrilico', 29900, 62, 'Aerocool (Streak) ATX (Acrilico).png', 3),
(66, 'Alseye Poseidon', 'Marca: Alseye;Modelo: Poseidon;Formato: ATX;Panel lateral: Acrilico', 53111, 5, 'Alseye (Poseidon) ATX (Acrilico).png', 3),
(67, 'Antec NX200', 'Marca: Antec;Modelo: NX200;Formato: ATX;Panel lateral: Acrilico', 35388, 39, 'Antec (NX200) ATX (Acrilico).png', 3),
(68, 'BitFenix Nova', 'Marca: BitFenix;Modelo: Nova;Formato: ATX;Panel lateral: Acrilico', 47700, 9, 'BitFenix (Nova) ATX (Acrilico).png', 3),
(69, 'Clio 5906BK', 'Marca: Clio;Modelo: 5906BK;Formato: ATX;Panel lateral: Aluminio', 17500, 99, 'Clio (5906BK) ATX (Aluminio).png', 3),
(70, 'Clio (CL-5930) ATX (Aluminio)', 'Marca: Clio;Modelo: CL-5930;Formato: ATX;Panel lateral: Aluminio', 24000, 78, 'Clio (CL-5930) ATX (Aluminio).png', 3),
(71, 'Cougar (MX330-G) ATX (Vidrio templado)', 'Marca: Cougar;Modelo: MX330-G;Formato: ATX;Panel lateral: Vidrio templado', 45000, 20, 'Cougar (MX330-G) ATX (Vidrio templado).png', 3),
(72, 'Darkflash Aquarius Mesh', 'Marca: Darkflash;Modelo: Aquarius Mesh;Formato: ATX;Panel lateral: Acrilico', 38000, 44, 'Darkflash (Aquarius Mesh) ATX (Acrilico).png', 3),
(73, 'Darkflash Aquarius', 'Marca: Darkflash ;Modelo: Aquarius;Formato: ATX;Panel lateral: Acrilico', 34000, 106, 'Darkflash (Aquarius) ATX (Acrilico).png', 3),
(74, 'Darkflash Melody', 'Marca: Darkflash ;Modelo: Melody;Formato: ATX;Panel lateral: Acrilico', 38455, 55, 'Darkflash (Melody) ATX (Acrilico).png', 3),
(75, 'Darkflash Pollux', 'Marca: Darkflash ;Modelo: Pollux;Formato: ATX;Panel lateral: Vidrio templado', 30000, 22, 'Darkflash (Pollux) ATX (Vidrio templado).png', 3),
(76, 'Dinon Model 3', 'Marca: Dinon;Modelo: Model 3;Formato: ATX;Panel lateral: Acrilico', 34400, 82, 'Dinon (Model 3) ATX (Acrilico).png', 3),
(77, 'Dinon Model 5', 'Marca: Dinon ;Modelo: Model 5;Formato: ATX;Panel lateral: Vidrio templado', 43990, 63, 'Dinon (Model 5) ATX (Vidrio templado).png', 3),
(78, 'Gamemax G503X', 'Marca: Gamemax ;Modelo: G503X;Formato: ATX;Panel lateral: Acrilico', 29990, 14, 'Gamemax (G503X) ATX (Acrilico).png', 3),
(79, 'Gamemax Shine G517', 'Marca: Gamemax ;Modelo: Shine G517;Formato: ATX;Panel lateral: Vidrio templado', 47690, 33, 'Gamemax (Shine G517) ATX (Vidrio templado).png', 3),
(80, 'Gear Blackstar', 'Marca: Gear;Modelo: Blackstar;Formato: ATX;Panel lateral: Vidrio templado', 42870, 55, 'Gear (Blackstar) ATX (Vidrio templado).png', 3),
(81, 'Nuvem Cloud Cluster', 'Marca: Nuvem;Modelo: Cloud Cluster;Formato: ATX;Panel lateral: Vidrio templado', 32600, 5, 'Nuvem (Cloud Cluster) ATX (Vidrio templado).png', 3),
(82, 'Nuvem Drizzle', 'Marca: Nuvem;Modelo: Drizzle;Formato: ATX;Panel lateral: Vidrio templado', 34660, 22, 'Nuvem (Drizzle) ATX (Vidrio templado).png', 3),
(83, 'PowerTrain DAOFENG 5', 'Marca: PowerTrain ;Modelo: DAOFENG 5;Formato: ATX;Panel lateral: Vidrio templado', 55690, 66, 'PowerTrain (DAOFENG 5) ATX (Vidrio templado).png', 3),
(84, 'PowerTrain NM62', 'Marca: PowerTrain;Modelo: NM62;Formato: ATX;Panel lateral: Acrilico', 37700, 37, 'PowerTrain (NM62) ATX (Acrilico).png', 3),
(85, 'Segotep Gank 5', 'Marca: Segotep;Modelo: Gank 5;Formato: ATX;Panel lateral: Vidrio templado', 42300, 41, 'Segotep (Gank 5) ATX (Vidrio templado).png', 3),
(86, 'Segotep Nova S6', 'Marca: Segotep;Modelo: Nova S6;Formato: ATX;Panel lateral: Vidrio templado', 39990, 145, 'Segotep (Nova S6) ATX (Vidrio templado).png', 3),
(87, 'Segotep Prime XL', 'Marca: Segotep;Modelo: Prime XL;Formato: ATX;Panel lateral: Vidrio templado', 29000, 2, 'Segotep (Prime XL) ATX (Vidrio templado).png', 3),
(88, 'Azza Luminous 110F', 'Marca: Azza;Modelo: Luminous ;Formato: Micro ATX;Panel lateral: Vidrio templado', 34670, 28, 'Azza (Luminous 110F) Micro ATX (Vidrio templado).png', 3),
(89, 'Centaurus Diapper', 'Marca: Centaurus;Modelo: Diapper;Formato: Micro ATX;Panel lateral: Acrilico', 37000, 53, 'Centaurus (Diapper) Micro ATX (Vidrio templado).png', 3),
(90, 'Centaurus TM-C03B', 'Marca: Centaurus;Modelo: TM-C03B;Formato: Micro ATX;Panel lateral: Acrilico', 29500, 75, 'Centaurus (TM-C03B) Micro ATX (Acrilico).png', 3),
(91, 'Centaurus V13', 'Marca: Centaurus;Modelo: V13;Formato: Micro ATX;Panel lateral: Vidrio templado', 39900, 93, 'Centaurus (V13) Micro ATX (Vidrio templado).png', 3),
(92, 'Cooler Master MasterBox MB311L', 'Marca: Cooler Master;Modelo: MasterBox MB311L;Formato: Micro ATX;Panel lateral: Vidrio templado', 41100, 38, 'Cooler Master (MasterBox MB311L) Micro ATX (Vidrio templado).png', 3),
(93, 'Cooler Master MasterBox MB320L', 'Marca: Cooler Master;Modelo: MasterBox MB320L;Formato: Micro ATX;Panel lateral: Vidrio templado', 38500, 64, 'Cooler Master (MasterBox MB320L) Micro ATX (Vidrio templado).png', 3),
(94, 'Cooler Master MasterBox Q300L', 'Marca: Cooler Master;Modelo: MasterBox Q300L;Formato: Micro ATX;Panel lateral: Acrilico', 24390, 33, 'Cooler Master (MasterBox Q300L) Micro ATX (Acrilico).png', 3),
(95, 'Cougar MG120', 'Marca: Cougar;Modelo: MG120;Formato: Micro ATX;Panel lateral: Aluminio', 36135, 61, 'Cougar (MG120) Micro ATX (Aluminio).png', 3),
(96, 'Cougar MG120-G', 'Marca: Cougar;Modelo: MG120-G;Formato: Micro ATX;Panel lateral: Vidrio templado', 47890, 4, 'Cougar (MG120-G) Micro ATX (Vidrio templado).png', 3),
(97, 'Cougar MG130', 'Marca: Cougar;Modelo: MG130;Formato: Micro ATX;Panel lateral: Aluminio', 40000, 78, 'Cougar (MG130) Micro ATX (Aluminio).png', 3),
(98, 'Cougar MG130-G', 'Marca: Cougar;Modelo: MG130-G;Formato: Micro ATX;Panel lateral: Vidrio templado', 37110, 62, 'Cougar (MG130-G) Micro ATX (Vidrio templado).png', 3),
(99, 'Darkflash DLM22', 'Marca: Darkflash;Modelo: DLM22;Formato: Micro ATX;Panel lateral: Acrilico', 48990, 179, 'Darkflash (DLM22) Micro ATX (Vidrio templado).png', 3),
(100, 'Darkflash Neo 202', 'Marca: Darkflash;Modelo: Neo 202;Formato: Micro ATX;Panel lateral: Vidrio templado', 46170, 11, 'Darkflash (Neo 202) Micro ATX (Vidrio templado).png', 3),
(101, 'DeepCool Matrexx 30', 'Marca: DeepCool;Modelo: Matrexx 30;Formato: Micro ATX;Panel lateral: Vidrio templado', 45660, 99, 'DeepCool (Matrexx 30) Micro ATX (Vidrio templado).png', 3),
(102, 'Gamemax 6602', 'Marca: Gamemax;Modelo: 6602;Formato: Micro ATX;Panel lateral: Acrilico', 28000, 31, 'Gamemax (6602) Micro ATX (Acrilico).png', 3),
(103, 'Gamemax Expedition H605', 'Marca: Gamemax;Modelo: Expedition;Formato: Micro ATX;Panel lateral: Acrilico', 33000, 109, 'Gamemax (Expedition H605) Micro ATX (Acrilico).png', 3),
(104, 'Microlab 7877', 'Marca: Microlab;Modelo: 7877;Formato: Micro ATX;Panel lateral: Aluminio', 24770, 88, 'Microlab (7877) Micro ATX (Aluminio).png', 3),
(105, 'Microlab 7879', 'Marca: Microlab;Modelo: 7879;Formato: Micro ATX;Panel lateral: Aluminio', 20000, 10, 'Microlab (7879) Micro ATX (Aluminio).png', 3),
(106, 'Nox Infinity Alpha', 'Marca: Nox;Modelo: Infinity Alpha;Formato: Micro ATX;Panel lateral: Vidrio templado', 57520, 19, 'Nox (Infinity Alpha) Micro ATX (Vidrio templado).png', 3),
(107, 'Nuvem Omega', 'Marca: Nuvem;Modelo: Omega;Formato: Micro ATX;Panel lateral: Acrilico', 38990, 55, 'Nuvem (Omega) Micro ATX (Vidrio templado).png', 3),
(108, 'Sunshine S605BK', 'Marca: Sunshine;Modelo: S605BK;Formato: Micro ATX;Panel lateral: Aluminio', 19500, 73, 'Sunshine (S605BK) Micro ATX (Aluminio).png', 3),
(109, 'Thermaltake S100 TG', 'Marca: Thermaltake;Modelo: S100 TG;Formato: Micro ATX;Panel lateral: Vidrio templado', 61000, 12, 'Thermaltake (S100 TG) Micro ATX (Vidrio templado).png', 3),
(110, 'Xigmatek OMG', 'Marca: Xigmatek;Modelo: OMG;Formato: Micro ATX;Panel lateral: Vidrio templado', 44890, 62, 'Xigmatek (OMG) Micro ATX (Vidrio templado).png', 3),
(111, 'XTech XTQ-100', 'Marca: XTech;Modelo: XTQ-100;Formato: Micro ATX;Panel lateral: Aluminio', 24560, 14, 'XTech (XTQ-100) Micro ATX (Aluminio).png', 3),
(112, 'XTech XTQ-200', 'Marca: XTech;Modelo: XTQ-200;Formato: Micro ATX;Panel lateral: Aluminio', 22550, 66, 'XTech (XTQ-200) Micro ATX (Aluminio).png', 3),
(113, 'ASRock Gaming K4', 'Marca: ASRock;Modelo: Gaming K4;Chipset: B450;Formato: ATX;Socket: AM4;Memoria: DDR4', 134265, 199, 'ASRock (Gaming K4) B450 ATX AM4 DDR4.png', 4),
(114, 'ASRock Phantom Gaming 4 AC', 'Marca: ASRock;Modelo: Phantom Gaming 4 AC;Chipset: B550;Formato: ATX;Socket: AM4;Memoria: DDR4', 103000, 121, 'ASRock (Phantom Gaming 4 AC) B550 ATX AM4 DDR4.png', 4),
(115, 'ASRock Phantom Gaming 4', 'Marca: ASRock;Modelo: Phantom Gaming 4;Chipset: B550;Formato: ATX;Socket: AM4;Memoria: DDR4', 131000, 24, 'ASRock (Phantom Gaming 4) B550 ATX AM4 DDR4.png', 4),
(116, 'ASRock Phantom Gaming 4', 'Marca: ASRock;Modelo: Phantom Gaming 4;Chipset: X570;Formato: ATX;Socket: AM4;Memoria: DDR4', 155000, 6, 'ASRock (Phantom Gaming 4) X570 ATX AM4 DDR4.png', 4),
(117, 'ASRock Phantom Gaming 4s', 'Marca: ASRock;Modelo: Phantom Gaming 4s;Chipset: X570;Formato: ATX;Socket: AM4;Memoria: DDR4', 157990, 23, 'ASRock (Phantom Gaming 4s) X570 ATX AM4 DDR4.png', 4),
(118, 'ASRock Pro4', 'Marca: ASRock;Modelo: Pro4;Chipset: B450;Formato: ATX;Socket: AM4;Memoria: DDR4', 127770, 78, 'ASRock (Pro4) B450 ATX AM4 DDR4.png', 4),
(119, 'ASRock Pro4', 'Marca: ASRock;Modelo: Pro4;Chipset: B550;Formato: ATX;Socket: AM4;Memoria: DDR4', 143980, 66, 'ASRock (Pro4) B550 ATX AM4 DDR4.png', 4),
(120, 'ASRock Pro4', 'Marca: ASRock;Modelo: Pro4;Chipset: X370;Formato: ATX;Socket: AM4;Memoria: DDR4', 179000, 11, 'ASRock (Pro4) X370 ATX AM4 DDR4.png', 4),
(121, 'ASRock Steel Legend', 'Marca: ASRock;Modelo: Steel Legend;Chipset: B450;Formato: ATX;Socket: AM4;Memoria: DDR4', 122000, 33, 'ASRock (Steel Legend) B450 ATX AM4 DDR4.png', 4),
(122, 'ASUS PRIME', 'Marca: ASUS;Modelo: PRIME;Chipset: B550;Formato: ATX;Socket: AM4;Memoria: DDR4', 119990, 49, 'ASUS (PRIME) B550 ATX AM4 DDR4.png', 4),
(123, 'ASUS PRIME', 'Marca: ASUS;Modelo: PRIME;Chipset: X570;Formato: ATX;Socket: AM4;Memoria: DDR4', 164980, 86, 'ASUS (PRIME) X570 ATX AM4 DDR4.png', 4),
(124, 'ASUS ROG STRIX GAMING II', 'Marca: ASUS;Modelo: ROG STRIX GAMING II;Chipset: B450;Formato: ATX;Socket: AM4;Memoria: DDR4', 122650, 62, 'ASUS (ROG STRIX GAMING II) B450 ATX AM4 DDR4.png', 4),
(125, 'ASUS TUF GAMING', 'Marca: ASUS;Modelo: TUF GAMING;Chipset: B450;Formato: ATX;Socket: AM4;Memoria: DDR4', 146770, 55, 'ASUS (TUF GAMING) B450 ATX AM4 DDR4.png', 4),
(126, 'Gigabyte AORUS ELITE V2', 'Marca: Gigabyte;Modelo: AORUS ELITE V2;Chipset: B450;Formato: ATX;Socket: AM4;Memoria: DDR4', 112450, 155, 'Gigabyte (AORUS ELITE V2) B450 ATX AM4 DDR4.png', 4),
(127, 'Gigabyte AORUS ELITE', 'Marca: Gigabyte;Modelo: AORUS ELITE;Chipset: B520;Formato: ATX;Socket: AM4;Memoria: DDR4', 103220, 76, 'Gigabyte (AORUS ELITE) B520 ATX AM4 DDR4.png', 4),
(128, 'Gigabyte AORUS PRO WIFI', 'Marca: Gigabyte;Modelo: AORUS PRO WIFI;Chipset: B450;Formato: ATX;Socket: AM4;Memoria: DDR4', 134440, 2, 'Gigabyte (AORUS PRO WIFI) B450 ATX AM4 DDR4.png', 4),
(129, 'Gigabyte GAMING X', 'Marca: Gigabyte;Modelo: GAMING X;Chipset: B550;Formato: ATX;Socket: AM4;Memoria: DDR4', 151260, 20, 'Gigabyte (GAMING X) B550 ATX AM4 DDR4.png', 4),
(130, 'Gigabyte UD', 'Marca: Gigabyte;Modelo: UD;Chipset: X570;Formato: ATX;Socket: AM4;Memoria: DDR4', 206000, 91, 'Gigabyte (UD) X570 ATX AM4 DDR4.png', 4),
(131, 'MSI GAMING PLUS MAX', 'Marca: MSI;Modelo: GAMING PLUS MAX;Chipset: X470;Formato: ATX;Socket: AM4;Memoria: DDR4', 189000, 50, 'MSI (GAMING PLUS MAX) X470 ATX AM4 DDR4.png', 4),
(132, 'MSI TOMAHAWK MAX II', 'Marca: MSI;Modelo: TOMAHAWK MAX II;Chipset: B450;Formato: ATX;Socket: AM4;Memoria: DDR4', 118555, 204, 'MSI (TOMAHAWK MAX II) B450 ATX AM4 DDR4.png', 4),
(133, 'ASRock A320M-HDV', 'Marca: ASrock;Modelo: A320M-HDV;Chipset: A320;Formato: Micro ATX;Socket: AM4;Memoria: DDR4', 89430, 114, 'ASRock (A320M-HDV) A320 Micro ATX AM4 DDR4.png', 4),
(134, 'ASUS A320M-K', 'Marca: ASUS;Modelo: A320M-K;Chipset: A320;Formato: Micro ATX;Socket: AM4;Memoria: DDR4', 67770, 124, 'ASUS (A320M-K) A320 Micro ATX AM4 DDR4.png', 4),
(135, 'Biostar A320MH', 'Marca: Biostar;Modelo: A320MH;Chipset: A320;Formato: Micro ATX;Socket: AM4;Memoria: DDR4', 74990, 26, 'Biostar (A320MH) A320 Micro ATX AM4 DDR4.png', 4),
(136, 'ECS A320AM4-M3D', 'Marca: ECS;Modelo: A320AM4-M3D;Chipset: B550;Formato: Micro ATX;Socket: AM4;Memoria: DDR4', 58000, 84, 'ECS (A320AM4-M3D) A320 Micro ATX AM4 DDR4.png', 4),
(137, 'Gigabyte GA-A320M-S2H', 'Marca: Gigabyte;Modelo: GA-A320M-S2H;Chipset: A320;Formato: Micro ATX;Socket: AM4;Memoria: DDR4', 91890, 39, 'Gigabyte (GA-A320M-S2H) A320 Micro ATX AM4 DDR4.png', 4),
(138, 'ASRock Phantom Gaming 4', 'Marca: ASRock;Modelo: Phantom Gaming 4;Chipset: H570;Formato: ATX;Socket: LGA 1200;Memoria: DDR4', 145000, 132, 'ASRock (Phantom Gaming 4) H570 ATX LGA 1200 DDR4.png', 4),
(139, 'ASRock Phantom Gaming 4', 'Marca: ASRock;Modelo: Phantom Gaming 4;Chipset: Z590;Formato: ATX;Socket: LGA 1200;Memoria: DDR4', 198000, 76, 'ASRock (Phantom Gaming 4) Z590 ATX LGA 1200 DDR4.png', 4),
(140, 'ASRock Pro 4', 'Marca: ASRock;Modelo: Pro 4;Chipset: B560;Formato: ATX;Socket: LGA 1200;Memoria: DDR4', 155430, 14, 'ASRock (Pro 4) B560 ATX LGA 1200 DDR4.png', 4),
(141, 'ASRock Steel legend WiFi 6E', 'Marca: ASRock;Modelo: Steel legend WiFi 6E;Chipset: Z590;Formato: ATX;Socket: LGA 1200;Memoria: DDR4', 237200, 33, 'ASRock (Steel legend WiFi 6E) Z590 ATX LGA 1200 DDR4.png', 4),
(142, 'ASRock Steel Legend', 'Marca: ASRock;Modelo: Steel Legend;Chipset: Z590;Formato: ATX;Socket: LGA 1200;Memoria: DDR4', 242000, 95, 'ASRock (Steel Legend) Z590 ATX LGA 1200 DDR4.png', 4),
(143, 'ASRock Stell Legend', 'Marca: ASRock;Modelo: Stell Legend;Chipset: B560;Formato: ATX;Socket: LGA 1200;Memoria: DDR4', 132770, 3, 'ASRock (Stell Legend) B560 ATX LGA 1200 DDR4.png', 4),
(144, 'ASUS PRIME Z590-P WIFI', 'Marca: ASUS;Modelo: PRIME Z590-P WIFI;Chipset: Z590;Formato: ATX;Socket: LGA 1200;Memoria: DDR4', 201450, 21, 'ASUS (PRIME Z590-P WIFI) Z590 ATX LGA 1200 DDR4.png', 4),
(145, 'ASUS PRIME Z590-P', 'Marca: ASUS;Modelo: PRIME Z590-P;Chipset: Z590;Formato: ATX;Socket: LGA 1200;Memoria: DDR4', 179880, 19, 'ASUS (PRIME Z590-P) Z590 ATX LGA 1200 DDR4.png', 4),
(146, 'ASUS PRIME', 'Marca: ASUS;Modelo: PRIME;Chipset: H570;Formato: ATX;Socket: LGA 1200;Memoria: DDR4', 159125, 44, 'ASUS (PRIME) H570 ATX LGA 1200 DDR4.png', 4),
(147, 'ASUS PRIME', 'Marca: ASUS;Modelo: PRIME;Chipset: Z490;Formato: ATX;Socket: LGA 1200;Memoria: DDR4', 189210, 77, 'ASUS (PRIME) Z490 ATX LGA 1200 DDR4.png', 4),
(148, 'ASUS TUF GAMING H570-PRO WIFI', 'Marca: ASUS;Modelo: TUF GAMING H570-PRO WIFI;Chipset: H570;Formato: ATX;Socket: LGA 1200;Memoria: DDR4', 162330, 2, 'ASUS (TUF GAMING H570-PRO WIFI) H570 ATX LGA 1200 DDR4.png', 4),
(149, 'ASUS TUF GAMING Z590-PLUS', 'Marca: ASUS;Modelo: TUF GAMING Z590-PLUS;Chipset: H570;Formato: ATX;Socket: LGA 1200;Memoria: DDR4', 214300, 156, 'ASUS (TUF GAMING Z590-PLUS) Z590 ATX LGA 1200 DDR4.png', 4),
(150, 'Biostar RACING Z590GTA', 'Marca: Biostar;Modelo: RACING Z590GTA;Chipset: Z590;Formato: ATX;Socket: LGA 1200;Memoria: DDR4', 198450, 67, 'Biostar (RACING Z590GTA) Z590 ATX LGA 1200 DDR4.png', 4),
(151, 'Biostar Z490A-SILVER', 'Marca: Biostar;Modelo: Z490A-SILVER;Chipset: Z490;Formato: ATX;Socket: LGA 1200;Memoria: DDR4', 203000, 40, 'Biostar (Z490A-SILVER) Z490 ATX LGA 1200 DDR4.png', 4),
(152, 'Gigabyte AORUS PRO AC', 'Marca: Gigabyte;Modelo: AORUS PRO AC;Chipset: B460;Formato: ATX;Socket: LGA 1200;Memoria: DDR4', 122990, 99, 'Gigabyte (AORUS PRO AC) B460 ATX LGA 1200 DDR4.png', 4),
(153, 'Gigabyte AORUS PRO AX', 'Marca: Gigabyte;Modelo: AORUS PRO AX;Chipset: B560;Formato: ATX;Socket: LGA 1200;Memoria: DDR4', 138440, 10, 'Gigabyte (AORUS PRO AX) B560 ATX LGA 1200 DDR4.png', 4),
(154, 'Gigabyte Z590 UD AC', 'Marca: Gigabyte;Modelo: Z590 UD AC;Chipset: Z590;Formato: ATX;Socket: LGA 1200;Memoria: DDR4', 200000, 100, 'Gigabyte (Z590 UD AC) Z590 ATX LGA 1200 DDR4.png', 4),
(155, 'Gigabyte Z590 UD', 'Marca: Gigabyte;Modelo: Z590 UD;Chipset: Z590;Formato: ATX;Socket: LGA 1200;Memoria: DDR4', 186700, 23, 'Gigabyte (Z590 UD) Z590 ATX LGA 1200 DDR4.png', 4),
(156, 'MSI Z490-A PRO', 'Marca: MSI;Modelo: Z490-A PRO;Chipset: Z490;Formato: ATX;Socket: LGA 1200;Memoria: DDR4', 165000, 14, 'MSI (Z490-A PRO) Z490 ATX LGA 1200 DDR4.png', 4),
(157, 'MSI Z590-A PRO', 'Marca: MSI;Modelo: Z590-A PRO;Chipset: Z590;Formato: ATX;Socket: LGA 1200;Memoria: DDR4', 264000, 55, 'MSI (Z590-A PRO) Z590 ATX LGA 1200 DDR4.png', 4),
(158, 'ASUS PRIME H310M-E', 'Marca: ASUS;Modelo: PRIME H310M-E;Chipset: H310;Formato: Micro ATX;Socket: LGA 1151;Memoria: DDR4', 49450, 210, 'ASUS (PRIME H310M-E) H310 Micro ATX LGA 1151 DDR4.png', 4),
(159, 'Biostar H310MHP', 'Marca: Biostar;Modelo: H310MHP;Chipset: H310;Formato: Micro ATX;Socket: LGA 1151;Memoria: DDR4', 64220, 87, 'Biostar (H310MHP) H310 Micro ATX LGA 1151 DDR4.png', 4),
(160, 'ECS H310CH5-M2', 'Marca: ECS;Modelo: H310CH5-M2;Chipset: H310;Formato: Micro ATX;Socket: LGA 1151;Memoria: DDR4', 56440, 27, 'ECS (H310CH5-M2) H310 Micro ATX LGA 1151 DDR4.png', 4),
(161, 'MSI B365M PRO-VH', 'Marca: MSI;Modelo: B365M PRO-VH;Chipset: B365;Formato: Micro ATX;Socket: LGA 1151;Memoria: DDR4', 94890, 78, 'MSI (B365M PRO-VH) B365 Micro ATX LGA 1151 DDR4.png', 4),
(162, 'MSI H310M PRO-VDH PLUS', 'Marca: MSI;Modelo: H310M PRO-VDH PLUS;Chipset: H310;Formato: Micro ATX;Socket: LGA 1151;Memoria: DDR4', 52300, 48, 'MSI (H310M PRO-VDH PLUS) H310 Micro ATX LGA 1151 DDR4.png', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_pedido`
--

CREATE TABLE `producto_pedido` (
  `id` int(11) NOT NULL,
  `unidades` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `pedido_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `producto_pedido`
--

INSERT INTO `producto_pedido` (`id`, `unidades`, `producto_id`, `pedido_id`) VALUES
(1, 2, 1, 1),
(2, 1, 63, 1),
(3, 2, 43, 1),
(4, 4, 120, 1),
(5, 4, 92, 2),
(6, 1, 33, 2),
(7, 1, 111, 2),
(8, 2, 57, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_usuario`
--

CREATE TABLE `producto_usuario` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `producto_usuario`
--

INSERT INTO `producto_usuario` (`id`, `producto_id`, `usuario_id`) VALUES
(1, 1, 2),
(2, 114, 2),
(3, 38, 2),
(4, 65, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`id`, `nombre`, `telefono`, `correo`) VALUES
(1, 'AMD', '345216733', 'ventas@amd.com'),
(2, 'Intel', '246489704', 'ventas@intel.com'),
(3, 'Nvidia', '557341291', 'ventas@nvidia.com'),
(4, 'MSI', '456212345', 'ventas@msi.com'),
(5, 'ASUS', '668832418', 'ventas@asus.com'),
(6, 'Biostar', '192837211', 'ventas@biostar.com'),
(7, 'Microlab', '557321284', 'ventas@microlab.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `primer_nombre` varchar(255) NOT NULL,
  `segundo_nombre` varchar(255) NOT NULL,
  `apellido_paterno` varchar(255) NOT NULL,
  `apellido_materno` varchar(255) NOT NULL,
  `imagen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `correo`, `clave`, `tipo`, `primer_nombre`, `segundo_nombre`, `apellido_paterno`, `apellido_materno`, `imagen`) VALUES
(1, 'daniel@falso.local', '$2y$10$6wndH8iZ4pTeBGjIfc/lmOvFirEiq/7UnAFE861O0Ziw7fC7.yqK2', 'Administrador', 'Daniel', 'Andres', 'Alvarez', 'Zamorano', 'Daniel.png'),
(2, 'esteban@falso.local', '$2y$10$xymcZXJWRI8GYQUu7OL7OeFBW7PC4IgyZZF6otN3sfW9mCsFWBKcG', 'Cliente', 'Esteban', 'Rodrigo', 'Alvarez', 'Zamorano', 'Esteban.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id`,`usuario_id`),
  ADD KEY `fk_pedido_usuario1_idx` (`usuario_id`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`,`categoria_id`),
  ADD KEY `fk_producto_categoria_idx` (`categoria_id`);

--
-- Indices de la tabla `producto_pedido`
--
ALTER TABLE `producto_pedido`
  ADD PRIMARY KEY (`id`,`pedido_id`,`producto_id`),
  ADD KEY `fk_producto_has_pedido_pedido1_idx` (`pedido_id`),
  ADD KEY `fk_producto_has_pedido_producto1_idx` (`producto_id`);

--
-- Indices de la tabla `producto_usuario`
--
ALTER TABLE `producto_usuario`
  ADD PRIMARY KEY (`id`,`producto_id`,`usuario_id`),
  ADD KEY `fk_producto_usuario_producto1_idx` (`producto_id`),
  ADD KEY `fk_producto_usuario_usuario1_idx` (`usuario_id`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo_UNIQUE` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT de la tabla `producto_pedido`
--
ALTER TABLE `producto_pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `producto_usuario`
--
ALTER TABLE `producto_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `fk_pedido_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `producto_pedido`
--
ALTER TABLE `producto_pedido`
  ADD CONSTRAINT `fk_producto_has_pedido_pedido1` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_producto_has_pedido_producto1` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `producto_usuario`
--
ALTER TABLE `producto_usuario`
  ADD CONSTRAINT `fk_producto_usuario_producto1` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_producto_usuario_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
