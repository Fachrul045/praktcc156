-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 34.128.86.151
-- Generation Time: Jun 03, 2024 at 03:49 PM
-- Server version: 8.0.31-google
-- PHP Version: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auth_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `id` int NOT NULL,
  `nama` varchar(30) NOT NULL,
  `jurusan` varchar(30) NOT NULL,
  `alamat` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`id`, `nama`, `jurusan`, `alamat`) VALUES
(2, 'b', 'b', 'b');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'M Fikri', 'email@gmail.com', '$2b$10$Wr4EunRyINxZpyEWft9weuS6e04KuGYnLhuiiiKTiPTrDcv3ftv4i', NULL, '2021-10-26 04:41:29', '2021-10-26 07:18:50'),
(2, 'John Doe', 'john@gmail.com', '$2b$10$xp6VYwckwTrjhUCWgf5X3u4lFZq/NDC0/PGPh9TFT0lDICNDriPla', NULL, '2021-10-31 15:18:26', '2021-11-02 03:51:10'),
(3, 'a', 'a', '$2b$10$B11BMIN4jQlpP69LXpw9pOYU36HvOXLahykzLHCtCbPGELnef4xva', NULL, '2024-06-03 21:41:14', '2024-06-03 21:41:14'),
(4, 'b', 'b@gmail.com', '$2b$10$HpSOWVE2KspWU5X9kJMpHeEG08HMQMdPQkZAtsS9NfVcJfze/Fc3m', NULL, '2024-06-03 21:50:18', '2024-06-03 21:50:18'),
(5, 'c', 'c@gmail.com', '$2b$10$kOjB3lQGgKgSnlQIRZmEu.CaiZOKSeG7ICQKgqJCrhcEqfZ/W0X9m', NULL, '2024-06-03 15:20:35', '2024-06-03 15:20:35'),
(6, 'c', 'c@gmail.com', '$2b$10$XSI3osXJZRQ8SZX4GZJNYO0Y0N3wQppH1JDVRAw9WI.qPk62ySequ', NULL, '2024-06-03 15:35:54', '2024-06-03 15:35:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
