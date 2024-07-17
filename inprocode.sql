-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-07-2024 a las 23:11:50
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
  `price` int(11) NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bookings`
--

INSERT INTO `bookings` (`id`, `name`, `email`, `tel`, `date`, `time`, `service`, `price`, `notes`) VALUES
(1, 'Marujo Lopez', 'jordilopez@test.com', 646646646, '2024-07-15', '18:30:00', 'Servicio 1', 250, 'Test Notes'),
(2, 'Juan Perez', 'juan@juan.es', 676676676, '2024-07-25', '10:00:00', 'Servicio 125', 120, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate magna et leo tincidunt tempor. Etiam hendrerit varius mi, eu eleifend risus finibus sit amet. Fusce in dictum augue, ac feugiat erat. Sed vel quam sit amet lacus vulputate ullamcorper eu sit amet lorem. Vestibulum in lacinia est. Maecenas luctus in quam ac fringilla.'),
(3, 'Carlos Garcia', 'carlos2@carlos.com', 646686676, '2024-07-19', '16:45:00', 'Servicio 125', 0, 'Test Nota'),
(4, 'Carlos Tomas', 'carlos@carlos.com', 646646646, '2024-07-19', '18:49:00', 'Servicio 110', 0, 'Notas adicionales'),
(10, 'Juan Prado', 'pepe@pepe.io', 656656656, '2024-07-24', '17:00:00', 'Servicio 110', 0, ''),
(11, 'Manuela Diaz', 'manuela@test.com', 2147483647, '2024-07-12', '15:00:00', 'Servicio 5', 0, 'Pago pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locations`
--

CREATE TABLE `locations` (
  `markers` text NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
