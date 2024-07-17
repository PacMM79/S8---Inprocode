-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-07-2024 a las 22:24:11
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inprocode`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `tel` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `time` time NOT NULL,
  `service` text NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bookings`
--

INSERT INTO `bookings` (`id`, `name`, `email`, `tel`, `date`, `time`, `service`, `notes`) VALUES
(2, 'Juan Perez', 'juan@juan.es', 676676676, '2024-07-25', '10:00:00', 'Servicio 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate magna et leo tincidunt tempor.'),
(3, 'Carlos Garcia', 'carlos2@carlos.com', 646686676, '2024-07-19', '16:45:00', 'Servicio 3', 'Paga en caja'),
(4, 'Carlos Tomas', 'carlos@carlos.com', 646646646, '2024-07-19', '18:49:00', 'Servicio 4', 'Notas adicionales'),
(10, 'Juan Prado', 'pepe@pepe.io', 656656656, '2024-07-24', '17:00:00', 'Servicio 1', ''),
(11, 'Manuela Diaz', 'manuela@test.com', 2147483647, '2024-07-12', '15:00:00', 'Servicio 5', 'Pago pendiente'),
(12, 'Juana Brown', 'jbrown@test.com', 646676686, '2024-07-23', '09:29:00', 'Servicio 3', 'test notas'),
(14, 'Antonia Perez', 'test@testa.com', 636636636, '2024-08-23', '21:20:00', 'Servicio 1', ''),
(15, 'test', 'pepe@pepe.io', 646646767, '2024-09-19', '12:00:00', 'Servicio 3', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime DEFAULT NULL,
  `color` varchar(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `events`
--

INSERT INTO `events` (`id`, `title`, `start`, `end`, `color`) VALUES
(58, 'test 5', '2024-07-17 00:02:00', '2024-07-17 02:30:00', '#1608d9'),
(62, 'test 100', '2024-07-19 12:00:00', '2024-07-19 13:30:00', '#2ab24c'),
(64, 'hola 2', '2024-07-04 02:00:00', '2024-07-05 03:00:00', '#bd2828'),
(65, 'test 5', '2024-08-08 02:00:00', '2024-08-09 02:00:00', '#871ea4'),
(68, 'test 100', '2024-08-28 02:00:00', '2024-08-29 02:00:00', '#26a691'),
(69, 'test 5', '2024-10-17 02:00:00', '2024-10-18 02:00:00', '#a72aa3'),
(70, 'test 6', '2024-10-24 09:00:00', '2024-10-24 11:00:00', '#cf29db'),
(71, 'test 100', '2024-10-25 07:00:00', '2024-10-26 09:00:00', '#23a956');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `markers`
--

CREATE TABLE `markers` (
  `id` int(11) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `markers`
--

INSERT INTO `markers` (`id`, `lat`, `lng`, `title`, `description`, `category`) VALUES
(4, 41.395798975800375, 2.1824173812866388, 'Marcador Parque', 'Descripción para Parque', 'Parque'),
(5, 41.39747300873302, 2.1921162490844903, 'Marcador Parque', 'Descripción para Parque', 'Parque'),
(12, 41.41652819019919, 2.1829752807617364, 'Marcador Restaurante', 'Descripción para Restaurante', 'Restaurante'),
(17, 41.41582015843733, 2.189326751709002, 'Marcador Parque', 'Descripción para Parque', 'Parque'),
(23, 41.40828879752802, 2.1962790374756036, 'Marcador Museo', 'Descripción para Museo', 'Museo'),
(25, 41.394446840802324, 2.1919875030517755, 'Marcador Museo', 'Descripción para Museo', 'Museo'),
(31, 41.39470439249429, 2.166753280639666, 'Marcador Tienda', 'Descripción para Tienda', 'Tienda'),
(32, 41.395605815379874, 2.1719889526367364, 'Marcador Tienda', 'Descripción para Tienda', 'Tienda'),
(33, 41.397601778711206, 2.1772246246338067, 'Marcador Tienda', 'Descripción para Tienda', 'Tienda'),
(35, 41.4006277997548, 2.1913866882324395, 'Marcador Restaurante', 'Descripción para Restaurante', 'Restaurante'),
(36, 41.41054186027124, 2.1957640533447442, 'Marcador Restaurante', 'Descripción para Restaurante', 'Restaurante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `services`
--

INSERT INTO `services` (`id`, `name`) VALUES
(1, 'Servicio 1'),
(2, 'Servicio 2'),
(3, 'Servicio 3');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`) USING HASH;

--
-- Indices de la tabla `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `markers`
--
ALTER TABLE `markers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT de la tabla `markers`
--
ALTER TABLE `markers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
