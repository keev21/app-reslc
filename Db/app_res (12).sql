-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-04-2025 a las 05:36:01
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
(5, 6, 2, '2025-04-08 22:04:00', 0);

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
(1, 'prueba', 'asd', 1);

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
(3, 'cat2', 'cat11', 1);

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
(1, 'piso2', 'sad', 1, 1),
(4, 'piso4', 'qwe', 1, 1);

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
(1, 'Rafael', 'Sanchez', '099281231', 'Riobamba', 1, '2025-03-13 21:21:09'),
(3, 'cliente2', 'C', '098272631', 'Riobamba', 2, '2025-03-27 02:06:20'),
(6, 'Cliente 3', 'C', '0992823145', 'Rio', 2, '2025-03-31 15:39:01'),
(7, 'Daniela', 'Borja', '99827234', 'Quito', 4, '2025-03-31 15:40:07');

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
  `INV_IMAGE` varchar(200) NOT NULL,
  `INV_STOCK` int(11) NOT NULL,
  `INV_PRICE` decimal(10,2) NOT NULL,
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

INSERT INTO `res_inventory` (`INV_CODE`, `INV_NAME`, `INV_TYPE`, `INV_IVA`, `INV_IMAGE`, `INV_STOCK`, `INV_PRICE`, `BRAN_CODE`, `CAT_CODE`) VALUES
(1, 'Carne de res', 1, 13, 'uploads/inventario/kfctug53jb5ovrov.jpg', 5, 12.00, 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `res_order`
--

DROP TABLE IF EXISTS `res_order`;
CREATE TABLE `res_order` (
  `ORD_CODE` int(11) NOT NULL,
  `BOO_CODE` int(11) DEFAULT NULL,
  `INFO_CODE` int(11) NOT NULL COMMENT 'Cliente que hace el pedido',
  `ORD_DATE` datetime NOT NULL DEFAULT current_timestamp(),
  `ORD_STATUS` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0=Pendiente, 1=En preparación, 2=Completado, 3=Cancelado',
  `ORD_TOTAL` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `res_order`:
--   `BOO_CODE`
--       `res_booking` -> `BOO_CODE`
--

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
  `ORDD_NOTES` varchar(255) DEFAULT NULL COMMENT 'Notas especiales para el producto'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `res_order_details`:
--   `ORD_CODE`
--       `res_order` -> `ORD_CODE`
--   `INV_CODE`
--       `res_inventory` -> `INV_CODE`
--

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
(1, 'Admin', 1),
(2, 'Cliente', 1),
(4, 'Empleado', 1);

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
(2, 'mesa3', 'vip', 1, 0);

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
(1, 1, 'kevinsan16@gmail.com', '$2y$10$8/PXBao9pz3QnNvIPb8y7ONDrKTWxS2M0ikm0UYcpSLI4qoQA5DoG', 1),
(9, 7, 'k@g.com', '123', 1);

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
  ADD KEY `BOO_CODE` (`BOO_CODE`),
  ADD KEY `INFO_CODE` (`INFO_CODE`);

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
  MODIFY `BOO_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `res_branch_office`
--
ALTER TABLE `res_branch_office`
  MODIFY `BRAN_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `res_category`
--
ALTER TABLE `res_category`
  MODIFY `CAT_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `res_floor`
--
ALTER TABLE `res_floor`
  MODIFY `FLOO_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `res_info`
--
ALTER TABLE `res_info`
  MODIFY `INFO_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `res_inventory`
--
ALTER TABLE `res_inventory`
  MODIFY `INV_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `res_order`
--
ALTER TABLE `res_order`
  MODIFY `ORD_CODE` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `res_order_details`
--
ALTER TABLE `res_order_details`
  MODIFY `ORDD_CODE` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `res_rol`
--
ALTER TABLE `res_rol`
  MODIFY `ROL_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `res_table`
--
ALTER TABLE `res_table`
  MODIFY `TAB_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
