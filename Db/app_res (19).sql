-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-04-2025 a las 07:37:25
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
-- Base de datos: `app_res`
--
CREATE DATABASE IF NOT EXISTS `app_res` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `app_res`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `res_booking`
--

DROP TABLE IF EXISTS `res_booking`;
CREATE TABLE `res_booking` (
  `BOO_CODE` int(11) NOT NULL,
  `INFO_CODE` int(11) NOT NULL,
  `TAB_CODE` int(11) NOT NULL,
  `BOO_DATEBOOKING` datetime NOT NULL,
  `BOO_STATE` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `res_booking`:
--   `INFO_CODE`
--       `res_info` -> `INFO_CODE`
--   `TAB_CODE`
--       `res_table` -> `TAB_CODE`
--

--
-- Volcado de datos para la tabla `res_booking`
--

INSERT INTO `res_booking` (`BOO_CODE`, `INFO_CODE`, `TAB_CODE`, `BOO_DATEBOOKING`, `BOO_STATE`) VALUES
(1, 7, 1, '2025-04-12 12:00:00', 1),
(2, 8, 3, '2025-04-12 13:00:00', 1),
(3, 9, 5, '2025-04-13 14:00:00', 1),
(4, 10, 2, '2025-04-13 15:00:00', 1),
(5, 11, 4, '2025-04-14 16:00:00', 1),
(6, 12, 6, '2025-04-14 17:00:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `res_branch_office`
--

DROP TABLE IF EXISTS `res_branch_office`;
CREATE TABLE `res_branch_office` (
  `BRAN_CODE` int(11) NOT NULL,
  `BRAN_NAME` varchar(100) NOT NULL,
  `BRAN_ADDRES` varchar(100) NOT NULL,
  `BRAN_STATUS` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `res_branch_office`:
--

--
-- Volcado de datos para la tabla `res_branch_office`
--

INSERT INTO `res_branch_office` (`BRAN_CODE`, `BRAN_NAME`, `BRAN_ADDRES`, `BRAN_STATUS`) VALUES
(1, 'Sucursal Centro', 'Av. Primera 123, Riobamba', 1),
(2, 'Sucursal Norte', 'Calle Segunda 456, Riobamba', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `res_category`
--

DROP TABLE IF EXISTS `res_category`;
CREATE TABLE `res_category` (
  `CAT_CODE` int(11) NOT NULL,
  `CAT_NAME` varchar(200) NOT NULL,
  `CAT_TYPE` varchar(200) NOT NULL,
  `CAT_STATUS` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `res_category`:
--

--
-- Volcado de datos para la tabla `res_category`
--

INSERT INTO `res_category` (`CAT_CODE`, `CAT_NAME`, `CAT_TYPE`, `CAT_STATUS`) VALUES
(1, 'Entradas', 'Comida', 1),
(2, 'Platos Fuertes', 'Comida', 1),
(3, 'Postres', 'Comida', 1),
(4, 'Bebidas', 'Bebida', 1),
(5, 'Cócteles', 'Bebida', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `res_floor`
--

DROP TABLE IF EXISTS `res_floor`;
CREATE TABLE `res_floor` (
  `FLOO_CODE` int(11) NOT NULL,
  `FLOO_NAME` varchar(200) NOT NULL,
  `FLOO_TYPE` varchar(200) NOT NULL,
  `BRAN_CODE` int(11) NOT NULL,
  `FLOO_STATUS` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `res_floor`:
--   `BRAN_CODE`
--       `res_branch_office` -> `BRAN_CODE`
--

--
-- Volcado de datos para la tabla `res_floor`
--

INSERT INTO `res_floor` (`FLOO_CODE`, `FLOO_NAME`, `FLOO_TYPE`, `BRAN_CODE`, `FLOO_STATUS`) VALUES
(1, 'Planta Baja', 'Principal', 1, 1),
(2, 'Segundo Piso', 'VIP', 1, 1),
(3, 'Terraza', 'Exterior', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `res_info`
--

DROP TABLE IF EXISTS `res_info`;
CREATE TABLE `res_info` (
  `INFO_CODE` int(11) NOT NULL,
  `INFO_NAME` varchar(200) NOT NULL,
  `INFO_LASTNAME` varchar(200) NOT NULL,
  `INFO_PHONE` varchar(10) NOT NULL,
  `INFO_ADDRES` varchar(200) NOT NULL,
  `ROL_CODE` int(11) NOT NULL,
  `INFO_DATE` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `res_info`:
--   `ROL_CODE`
--       `res_rol` -> `ROL_CODE`
--

--
-- Volcado de datos para la tabla `res_info`
--

INSERT INTO `res_info` (`INFO_CODE`, `INFO_NAME`, `INFO_LASTNAME`, `INFO_PHONE`, `INFO_ADDRES`, `ROL_CODE`, `INFO_DATE`) VALUES
(1, 'Rafael', 'Sanchez', '099281231', 'Riobamba', 5, '2025-03-13 21:21:09'),
(2, 'María', 'González', '0987654321', 'Av. Admin 123', 1, '2025-01-15 08:00:00'),
(3, 'Carlos', 'Martínez', '0976543210', 'Calle Cocinero 456', 4, '2025-01-16 08:00:00'),
(4, 'Luisa', 'Fernández', '0965432109', 'Av. Mesero 789', 5, '2025-01-17 08:00:00'),
(5, 'Pedro', 'López', '0954321098', 'Calle Mesero 321', 5, '2025-01-18 08:00:00'),
(6, 'Ana', 'Rodríguez', '0943210987', 'Av. Recepción 654', 3, '2025-01-19 08:00:00'),
(7, 'Juan', 'Pérez', '0932109876', 'Calle 1 #123', 2, '2025-02-01 10:00:00'),
(8, 'María', 'García', '0921098765', 'Av. 2 #456', 2, '2025-02-01 11:00:00'),
(9, 'Carlos', 'López', '0910987654', 'Calle 3 #789', 2, '2025-02-02 10:30:00'),
(10, 'Ana', 'Martínez', '0909876543', 'Av. 4 #012', 2, '2025-02-02 11:30:00'),
(11, 'Luis', 'Rodríguez', '0998765432', 'Calle 5 #345', 2, '2025-02-03 12:00:00'),
(12, 'Laura', 'Sánchez', '0987654321', 'Av. 6 #678', 2, '2025-02-03 13:00:00'),
(13, 'Pedro', 'Fernández', '0976543210', 'Calle 7 #901', 2, '2025-02-04 14:00:00'),
(14, 'Sofía', 'Gómez', '0965432109', 'Av. 8 #234', 2, '2025-02-04 15:00:00'),
(15, 'Diego', 'Hernández', '0954321098', 'Calle 9 #567', 2, '2025-02-05 16:00:00'),
(16, 'Valeria', 'Díaz', '0943210987', 'Av. 10 #890', 2, '2025-02-05 17:00:00'),
(17, 'Jorge', 'Torres', '0932109876', 'Calle 11 #123', 2, '2025-02-06 18:00:00'),
(18, 'Camila', 'Vargas', '0921098765', 'Av. 12 #456', 2, '2025-02-06 19:00:00'),
(19, 'Andrés', 'Moreno', '0910987654', 'Calle 13 #789', 2, '2025-02-07 20:00:00'),
(20, 'Gabriela', 'Rojas', '0909876543', 'Av. 14 #012', 2, '2025-02-07 21:00:00'),
(21, 'Ricardo', 'Mendoza', '0998765432', 'Calle 15 #345', 2, '2025-02-08 22:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `res_inventory`
--

DROP TABLE IF EXISTS `res_inventory`;
CREATE TABLE `res_inventory` (
  `INV_CODE` int(11) NOT NULL,
  `INV_NAME` varchar(200) NOT NULL,
  `INV_TYPE` tinyint(1) NOT NULL,
  `INV_IVA` int(11) NOT NULL,
  `INV_MARGIN` decimal(10,0) NOT NULL,
  `INV_IMAGE` varchar(200) NOT NULL,
  `INV_UNIT_NAME` varchar(50) NOT NULL,
  `INV_STOCK` int(11) NOT NULL,
  `INV_PRICE` decimal(10,2) NOT NULL,
  `INV_PRICE_IVA_MARGIN` decimal(10,0) NOT NULL,
  `BRAN_CODE` int(11) NOT NULL,
  `CAT_CODE` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `res_inventory`:
--   `BRAN_CODE`
--       `res_branch_office` -> `BRAN_CODE`
--   `CAT_CODE`
--       `res_category` -> `CAT_CODE`
--

--
-- Volcado de datos para la tabla `res_inventory`
--

INSERT INTO `res_inventory` (`INV_CODE`, `INV_NAME`, `INV_TYPE`, `INV_IVA`, `INV_MARGIN`, `INV_IMAGE`, `INV_UNIT_NAME`, `INV_STOCK`, `INV_PRICE`, `INV_PRICE_IVA_MARGIN`, `BRAN_CODE`, `CAT_CODE`) VALUES
(1, 'Ceviche de camarón', 1, 12, 30, 'ceviche.jpg', 'Porción', 50, 5.00, 7, 1, 1),
(2, 'Empanadas de viento', 1, 12, 25, 'empanadas.jpg', 'Unidad', 100, 1.50, 2, 1, 1),
(3, 'Seco de pollo', 1, 12, 35, 'seco_pollo.jpg', 'Porción', 30, 8.00, 11, 1, 2),
(4, 'Encebollado', 1, 12, 30, 'encebollado.jpg', 'Porción', 40, 6.00, 8, 1, 2),
(5, 'Churrasco', 1, 12, 40, 'churrasco.jpg', 'Porción', 25, 12.00, 17, 1, 2),
(6, 'Tres leches', 1, 12, 25, 'tres_leches.jpg', 'Porción', 20, 4.00, 5, 1, 3),
(7, 'Helado de vainilla', 1, 12, 20, 'helado.jpg', 'Porción', 30, 3.00, 4, 1, 3),
(8, 'Jugo de naranja', 1, 12, 15, 'jugo.jpg', 'Vaso', 50, 2.00, 3, 1, 4),
(9, 'Cola', 1, 12, 10, 'cola.jpg', 'Botella', 60, 1.50, 2, 1, 4),
(10, 'Mojito', 1, 12, 50, 'mojito.jpg', 'Vaso', 40, 5.00, 8, 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `res_order`
--

DROP TABLE IF EXISTS `res_order`;
CREATE TABLE `res_order` (
  `ORD_CODE` int(11) NOT NULL,
  `BOO_CODE` int(11) DEFAULT NULL,
  `ORD_DATE` datetime NOT NULL DEFAULT current_timestamp(),
  `ORD_STATUS` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0=Pendiente, 1=En preparación, 2=Completado, 3=Cancelado',
  `ORD_TOTAL` decimal(10,2) NOT NULL DEFAULT 0.00,
  `ORD_PAYMENT` varchar(100) NOT NULL,
  `ORD_PAYMENT_ID` int(250) NOT NULL,
  `ORD_IMAGE` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `res_order`:
--   `BOO_CODE`
--       `res_booking` -> `BOO_CODE`
--

--
-- Volcado de datos para la tabla `res_order`
--

INSERT INTO `res_order` (`ORD_CODE`, `BOO_CODE`, `ORD_DATE`, `ORD_STATUS`, `ORD_TOTAL`, `ORD_PAYMENT`, `ORD_PAYMENT_ID`, `ORD_IMAGE`) VALUES
(1, 1, '2025-04-12 12:05:00', 2, 17.00, 'Efectivo', 1, ''),
(2, 2, '2025-04-12 13:10:00', 2, 25.00, 'Tarjeta', 2, ''),
(3, 3, '2025-04-13 14:15:00', 1, 8.00, 'Efectivo', 3, ''),
(4, 4, '2025-04-13 15:20:00', 1, 9.00, 'Tarjeta', 4, ''),
(5, NULL, '2025-04-11 18:00:00', 2, 11.00, 'Efectivo', 5, ''),
(6, NULL, '2025-04-11 19:00:00', 2, 22.00, 'Tarjeta', 6, ''),
(7, NULL, '2025-04-11 20:00:00', 1, 17.00, 'Efectivo', 7, ''),
(8, NULL, '2025-04-12 12:30:00', 2, 8.00, 'Tarjeta', 8, ''),
(9, NULL, '2025-04-12 13:45:00', 2, 15.00, 'Efectivo', 9, ''),
(10, NULL, '2025-04-13 14:30:00', 1, 16.00, 'Tarjeta', 10, ''),
(11, NULL, '2025-04-13 15:45:00', 1, 8.00, 'Efectivo', 11, ''),
(12, NULL, '2025-04-14 16:15:00', 0, 11.00, 'Tarjeta', 12, ''),
(13, NULL, '2025-04-14 17:30:00', 0, 12.00, 'Efectivo', 13, ''),
(14, NULL, '2025-04-15 18:00:00', 0, 17.00, 'Tarjeta', 14, ''),
(15, NULL, '2025-04-15 19:00:00', 0, 8.00, 'Efectivo', 15, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `res_order_details`
--

DROP TABLE IF EXISTS `res_order_details`;
CREATE TABLE `res_order_details` (
  `ORDD_CODE` int(11) NOT NULL,
  `ORD_CODE` int(11) NOT NULL,
  `INV_CODE` int(11) NOT NULL COMMENT 'Producto del inventario',
  `ORDD_QUANTITY` int(11) NOT NULL DEFAULT 1,
  `ORDD_PRICE` decimal(10,2) NOT NULL COMMENT 'Precio al momento del pedido',
  `ORDD_STATUS` varchar(255) DEFAULT NULL COMMENT 'Notas especiales para el producto'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `res_order_details`:
--   `ORD_CODE`
--       `res_order` -> `ORD_CODE`
--   `INV_CODE`
--       `res_inventory` -> `INV_CODE`
--

--
-- Volcado de datos para la tabla `res_order_details`
--

INSERT INTO `res_order_details` (`ORDD_CODE`, `ORD_CODE`, `INV_CODE`, `ORDD_QUANTITY`, `ORDD_PRICE`, `ORDD_STATUS`) VALUES
(1, 1, 3, 1, 11.00, NULL),
(2, 1, 8, 2, 6.00, 'Sin hielo'),
(3, 2, 5, 1, 17.00, NULL),
(4, 2, 10, 1, 8.00, NULL),
(5, 3, 4, 1, 8.00, NULL),
(6, 4, 1, 1, 7.00, NULL),
(7, 4, 9, 1, 2.00, NULL),
(8, 5, 2, 3, 6.00, NULL),
(9, 5, 6, 1, 5.00, NULL),
(10, 6, 3, 2, 22.00, NULL),
(11, 7, 5, 1, 17.00, 'Bien cocido'),
(12, 8, 7, 2, 8.00, NULL),
(13, 9, 1, 1, 7.00, NULL),
(14, 9, 4, 1, 8.00, NULL),
(15, 10, 10, 2, 16.00, NULL),
(16, 11, 6, 1, 5.00, NULL),
(17, 11, 8, 1, 3.00, NULL),
(18, 12, 3, 1, 11.00, NULL),
(19, 13, 4, 1, 8.00, NULL),
(20, 13, 9, 2, 4.00, NULL),
(21, 14, 5, 1, 17.00, NULL),
(22, 15, 2, 4, 8.00, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `res_rol`
--

DROP TABLE IF EXISTS `res_rol`;
CREATE TABLE `res_rol` (
  `ROL_CODE` int(11) NOT NULL,
  `ROL_TYPE` varchar(200) NOT NULL,
  `ROL_STATUS` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `res_rol`:
--

--
-- Volcado de datos para la tabla `res_rol`
--

INSERT INTO `res_rol` (`ROL_CODE`, `ROL_TYPE`, `ROL_STATUS`) VALUES
(1, 'Admin', 0),
(2, 'Cliente', 0),
(3, 'Recepcionista', 1),
(4, 'Cocinero', 0),
(5, 'Mesero', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `res_table`
--

DROP TABLE IF EXISTS `res_table`;
CREATE TABLE `res_table` (
  `TAB_CODE` int(11) NOT NULL,
  `TAB_NAME` varchar(200) NOT NULL,
  `TAB_TYPE` varchar(200) NOT NULL,
  `FLOO_CODE` int(11) NOT NULL,
  `TAB_STATUS` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `res_table`:
--   `FLOO_CODE`
--       `res_floor` -> `FLOO_CODE`
--

--
-- Volcado de datos para la tabla `res_table`
--

INSERT INTO `res_table` (`TAB_CODE`, `TAB_NAME`, `TAB_TYPE`, `FLOO_CODE`, `TAB_STATUS`) VALUES
(1, 'Mesa 1', 'Standard', 1, 1),
(2, 'Mesa 2', 'Standard', 1, 1),
(3, 'Mesa 3', 'VIP', 2, 1),
(4, 'Mesa 4', 'VIP', 2, 1),
(5, 'Mesa 5', 'Exterior', 3, 1),
(6, 'Mesa 6', 'Exterior', 3, 1),
(7, 'Mesa 7', 'Standard', 1, 1),
(8, 'Mesa 8', 'Standard', 1, 1),
(9, 'Mesa 9', 'VIP', 2, 1),
(10, 'Mesa 10', 'VIP', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `res_user`
--

DROP TABLE IF EXISTS `res_user`;
CREATE TABLE `res_user` (
  `USER_CODE` int(11) NOT NULL,
  `INFO_CODE` int(11) NOT NULL,
  `USER_EMAIL` varchar(200) NOT NULL,
  `USER_PASSWORD` varchar(350) NOT NULL,
  `BRAN_CODE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `res_user`:
--   `INFO_CODE`
--       `res_info` -> `INFO_CODE`
--   `BRAN_CODE`
--       `res_branch_office` -> `BRAN_CODE`
--

--
-- Volcado de datos para la tabla `res_user`
--

INSERT INTO `res_user` (`USER_CODE`, `INFO_CODE`, `USER_EMAIL`, `USER_PASSWORD`, `BRAN_CODE`) VALUES
(2, 2, 'admin@restaurante.com', '$2y$10$8/PXBao9pz3QnNvIPb8y7ONDrKTWxS2M0ikm0UYcpSLI4qoQA5DoG', 1),
(3, 3, 'cocinero@restaurante.com', '$2y$10$8/PXBao9pz3QnNvIPb8y7ONDrKTWxS2M0ikm0UYcpSLI4qoQA5DoG', 1),
(4, 4, 'mesero1@restaurante.com', '$2y$10$8/PXBao9pz3QnNvIPb8y7ONDrKTWxS2M0ikm0UYcpSLI4qoQA5DoG', 1),
(5, 5, 'mesero2@restaurante.com', '$2y$10$8/PXBao9pz3QnNvIPb8y7ONDrKTWxS2M0ikm0UYcpSLI4qoQA5DoG', 1),
(6, 6, 'recepcion@restaurante.com', '$2y$10$8/PXBao9pz3QnNvIPb8y7ONDrKTWxS2M0ikm0UYcpSLI4qoQA5DoG', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `res_booking`
--
ALTER TABLE `res_booking`
  ADD PRIMARY KEY (`BOO_CODE`),
  ADD KEY `INFO_CODE` (`INFO_CODE`),
  ADD KEY `TAB_CODE` (`TAB_CODE`);

--
-- Indices de la tabla `res_branch_office`
--
ALTER TABLE `res_branch_office`
  ADD PRIMARY KEY (`BRAN_CODE`);

--
-- Indices de la tabla `res_category`
--
ALTER TABLE `res_category`
  ADD PRIMARY KEY (`CAT_CODE`);

--
-- Indices de la tabla `res_floor`
--
ALTER TABLE `res_floor`
  ADD PRIMARY KEY (`FLOO_CODE`),
  ADD KEY `BRAN_CODE` (`BRAN_CODE`);

--
-- Indices de la tabla `res_info`
--
ALTER TABLE `res_info`
  ADD PRIMARY KEY (`INFO_CODE`),
  ADD KEY `ROL_CODE` (`ROL_CODE`);

--
-- Indices de la tabla `res_inventory`
--
ALTER TABLE `res_inventory`
  ADD PRIMARY KEY (`INV_CODE`),
  ADD KEY `BRAN_CODE` (`BRAN_CODE`),
  ADD KEY `CAT_CODE` (`CAT_CODE`);

--
-- Indices de la tabla `res_order`
--
ALTER TABLE `res_order`
  ADD PRIMARY KEY (`ORD_CODE`),
  ADD KEY `BOO_CODE` (`BOO_CODE`);

--
-- Indices de la tabla `res_order_details`
--
ALTER TABLE `res_order_details`
  ADD PRIMARY KEY (`ORDD_CODE`),
  ADD KEY `ORD_CODE` (`ORD_CODE`),
  ADD KEY `INV_CODE` (`INV_CODE`);

--
-- Indices de la tabla `res_rol`
--
ALTER TABLE `res_rol`
  ADD PRIMARY KEY (`ROL_CODE`);

--
-- Indices de la tabla `res_table`
--
ALTER TABLE `res_table`
  ADD PRIMARY KEY (`TAB_CODE`),
  ADD KEY `FLOO_CODE` (`FLOO_CODE`);

--
-- Indices de la tabla `res_user`
--
ALTER TABLE `res_user`
  ADD PRIMARY KEY (`USER_CODE`),
  ADD KEY `INFO_CODE` (`INFO_CODE`),
  ADD KEY `BRAN_CODE` (`BRAN_CODE`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `res_booking`
--
ALTER TABLE `res_booking`
  MODIFY `BOO_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `res_branch_office`
--
ALTER TABLE `res_branch_office`
  MODIFY `BRAN_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `res_category`
--
ALTER TABLE `res_category`
  MODIFY `CAT_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `res_floor`
--
ALTER TABLE `res_floor`
  MODIFY `FLOO_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `res_info`
--
ALTER TABLE `res_info`
  MODIFY `INFO_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `res_inventory`
--
ALTER TABLE `res_inventory`
  MODIFY `INV_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `res_order`
--
ALTER TABLE `res_order`
  MODIFY `ORD_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `res_order_details`
--
ALTER TABLE `res_order_details`
  MODIFY `ORDD_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `res_rol`
--
ALTER TABLE `res_rol`
  MODIFY `ROL_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `res_table`
--
ALTER TABLE `res_table`
  MODIFY `TAB_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `res_user`
--
ALTER TABLE `res_user`
  MODIFY `USER_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `res_booking`
--
ALTER TABLE `res_booking`
  ADD CONSTRAINT `res_booking_ibfk_1` FOREIGN KEY (`INFO_CODE`) REFERENCES `res_info` (`INFO_CODE`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `res_booking_ibfk_2` FOREIGN KEY (`TAB_CODE`) REFERENCES `res_table` (`TAB_CODE`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `res_floor`
--
ALTER TABLE `res_floor`
  ADD CONSTRAINT `res_floor_ibfk_1` FOREIGN KEY (`BRAN_CODE`) REFERENCES `res_branch_office` (`BRAN_CODE`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `res_info`
--
ALTER TABLE `res_info`
  ADD CONSTRAINT `res_info_ibfk_1` FOREIGN KEY (`ROL_CODE`) REFERENCES `res_rol` (`ROL_CODE`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `res_inventory`
--
ALTER TABLE `res_inventory`
  ADD CONSTRAINT `res_inventory_ibfk_1` FOREIGN KEY (`BRAN_CODE`) REFERENCES `res_branch_office` (`BRAN_CODE`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `res_inventory_ibfk_2` FOREIGN KEY (`CAT_CODE`) REFERENCES `res_category` (`CAT_CODE`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `res_order`
--
ALTER TABLE `res_order`
  ADD CONSTRAINT `res_order_ibfk_1` FOREIGN KEY (`BOO_CODE`) REFERENCES `res_booking` (`BOO_CODE`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `res_order_details`
--
ALTER TABLE `res_order_details`
  ADD CONSTRAINT `res_order_details_ibfk_1` FOREIGN KEY (`ORD_CODE`) REFERENCES `res_order` (`ORD_CODE`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `res_order_details_ibfk_2` FOREIGN KEY (`INV_CODE`) REFERENCES `res_inventory` (`INV_CODE`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `res_table`
--
ALTER TABLE `res_table`
  ADD CONSTRAINT `res_table_ibfk_1` FOREIGN KEY (`FLOO_CODE`) REFERENCES `res_floor` (`FLOO_CODE`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `res_user`
--
ALTER TABLE `res_user`
  ADD CONSTRAINT `res_user_ibfk_1` FOREIGN KEY (`INFO_CODE`) REFERENCES `res_info` (`INFO_CODE`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `res_user_ibfk_2` FOREIGN KEY (`BRAN_CODE`) REFERENCES `res_branch_office` (`BRAN_CODE`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
