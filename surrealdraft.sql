-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2023 at 04:14 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `surrealdraft`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `firstName` varchar(63) NOT NULL,
  `lastName` varchar(63) NOT NULL,
  `checkInDate` date NOT NULL,
  `checkInTime` time NOT NULL,
  `checkOutDate` date NOT NULL,
  `numberOfGuests` int(11) NOT NULL,
  `status` enum('booked','checkedOut','cancelled','pending','declined') DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedback_id` int(11) NOT NULL,
  `title` varchar(63) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `dateUploaded` datetime NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feedback_id`, `title`, `message`, `dateUploaded`, `user_id`) VALUES
(1, 'test', 'test', '2023-12-14 20:13:27', 16),
(2, 'test', 'test', '2023-12-14 20:13:32', 16),
(3, 'test', 'test', '2023-12-14 20:14:35', 16),
(4, 'Wow nice view', 'putang ina mooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', '2023-12-14 22:28:22', 16);

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `room_id` int(11) NOT NULL,
  `roomNumber` varchar(31) NOT NULL,
  `roomType` enum('bronze-queen','bronze-king','silver-king','gold-king','gold-twin') NOT NULL,
  `guestLimit` int(11) NOT NULL,
  `status` enum('available','booked','pending') NOT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`room_id`, `roomNumber`, `roomType`, `guestLimit`, `status`, `booking_id`, `price`) VALUES
(13, 'A1', 'bronze-queen', 1, 'available', NULL, 1500),
(14, 'A2', 'bronze-queen', 1, 'available', NULL, 1500),
(15, 'A3', 'bronze-queen', 1, 'available', NULL, 1500),
(16, 'A4', 'bronze-queen', 1, 'available', NULL, 1500),
(17, 'A5', 'bronze-queen', 1, 'available', NULL, 1500),
(18, 'B1', 'bronze-king', 2, 'available', NULL, 2000),
(19, 'B2', 'bronze-king', 2, 'available', NULL, 2000),
(20, 'B3', 'bronze-king', 2, 'available', NULL, 2000),
(21, 'B4', 'bronze-king', 2, 'available', NULL, 2000),
(22, 'B5', 'bronze-king', 2, 'available', NULL, 2000),
(28, 'C1', 'silver-king', 2, 'available', NULL, 3000),
(29, 'C2', 'silver-king', 2, 'available', NULL, 3000),
(30, 'C3', 'silver-king', 2, 'available', NULL, 3000),
(31, 'C4', 'silver-king', 2, 'available', NULL, 3000),
(32, 'C5', 'silver-king', 2, 'available', NULL, 3000),
(33, 'D1', 'gold-king', 4, 'available', NULL, 5000),
(34, 'D2', 'gold-king', 4, 'available', NULL, 5000),
(35, 'D3', 'gold-king', 4, 'available', NULL, 5000),
(36, 'E1', 'gold-twin', 4, 'available', NULL, 5000),
(37, 'E2', 'gold-twin', 4, 'available', NULL, 5000),
(38, 'E3', 'gold-twin', 4, 'available', NULL, 5000);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `firstName` varchar(63) NOT NULL,
  `lastName` varchar(63) NOT NULL,
  `contact` varchar(11) NOT NULL,
  `dateOfBirth` date NOT NULL,
  `email` varchar(127) NOT NULL,
  `password` varchar(63) NOT NULL,
  `address` varchar(63) NOT NULL,
  `role` enum('admin','regular') NOT NULL,
  `numberOfBooking` int(11) NOT NULL,
  `numberOfCancellation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `firstName`, `lastName`, `contact`, `dateOfBirth`, `email`, `password`, `address`, `role`, `numberOfBooking`, `numberOfCancellation`) VALUES
(15, 'Jerlon', 'Abayon', '09090909', '2023-12-03', 'Jerlon@usc', 'shai2', 'cebu', 'regular', 0, 0),
(16, 'Mr', 'Admin', '123123', '2023-11-23', 'admin@hotel', 'admin', 'earth', 'admin', 0, 0),
(17, 'marvs', 'tenebs', '09090909', '2424-02-01', 'marvs@usc', 'marvs', 'bh', 'regular', 0, 0),
(21, 'qwe', 'qwe', '1234', '0123-03-12', 'qweqw@qwqw', '123', 'ert', 'regular', 0, 0),
(22, 'Bryan ', 'Alcover', '123123', '0123-03-12', 'bryan@usc', '123', 'ert', 'regular', 0, 0),
(23, 'test', 'test', '09090909', '0001-01-01', 'test@test', 'test', 'test', 'regular', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `fk_user` (`user_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `feedback_user` (`user_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`room_id`),
  ADD KEY `fkr_booking` (`booking_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedback_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `fkr_booking` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
