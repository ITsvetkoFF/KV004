-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Database Enviromap
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `Enviromap` ;
CREATE DATABASE IF NOT EXISTS `Enviromap` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `Enviromap` ;

-- -----------------------------------------------------
-- Table `Enviromap`.`ProblemTypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProblemTypes` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Type` VARCHAR(45) NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Enviromap`.`Problems`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Problems` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Title` VARCHAR(70) NULL,
  `Content` VARCHAR(500) NULL,
  `Severity` TINYINT UNSIGNED NULL,
  `Moderation` TINYINT(1) NULL,
  `Votes` SMALLINT UNSIGNED NULL,
  `Latitude` FLOAT(9,6) NULL,
  `Longtitude` FLOAT(9,6) NULL,
  `Status` TINYINT(1) NULL,
  `ProblemTypes_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC),
  INDEX `fk_Problems_ProblemTypes1_idx` (`ProblemTypes_Id` ASC),
  CONSTRAINT `fk_Problems_ProblemTypes1`
    FOREIGN KEY (`ProblemTypes_Id`)
    REFERENCES `Enviromap`.`ProblemTypes` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Enviromap`.`UserRoles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UserRoles` (
  `Id` INT NOT NULL,
  `Role` VARCHAR(45) NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Enviromap`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Users` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NULL,
  `Surname` VARCHAR(45) NULL,
  `Email` VARCHAR(45) NULL,
  `Password` CHAR(64) NULL,
  `UserRoles_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Users_UserRoles1_idx` (`UserRoles_Id` ASC),
  CONSTRAINT `fk_Users_UserRoles1`
    FOREIGN KEY (`UserRoles_Id`)
    REFERENCES `Enviromap`.`UserRoles` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Enviromap`.`Photos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Photos` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Link` VARCHAR(100) NULL,
  `Status` TINYINT(1) NULL,
  `Description` VARCHAR(200) NULL,
  `Problems_Id` INT NOT NULL,
  `Users_Id` INT NULL,
  PRIMARY KEY (`Id`, `Problems_Id`),
  INDEX `fk_Photos_Problems1_idx` (`Problems_Id` ASC),
  INDEX `fk_Photos_Users1_idx` (`Users_Id` ASC),
  CONSTRAINT `fk_Photos_Problems1`
    FOREIGN KEY (`Problems_Id`)
    REFERENCES `Enviromap`.`Problems` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Photos_Users1`
    FOREIGN KEY (`Users_Id`)
    REFERENCES `Enviromap`.`Users` (`Id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Enviromap`.`ActivityTypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ActivityTypes` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Enviromap`.`Resources`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Resources` (
`Alias` VARCHAR(30) NOT NULL,
`Title` VARCHAR(150) NOT NULL,
`Content` VARCHAR(5000) NOT NULL,
PRIMARY KEY (`Alias`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Enviromap`.`Activities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Activities` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Content` VARCHAR(500) NULL,
  `Date` DATE NULL,
  `ActivityTypes_Id` INT NOT NULL,
  `Users_Id` INT NULL,
  `Problems_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Activities_ActivityTypes1_idx` (`ActivityTypes_Id` ASC),
  INDEX `fk_Activities_Users1_idx` (`Users_Id` ASC),
  INDEX `fk_Activities_Problems1_idx` (`Problems_Id` ASC),
  CONSTRAINT `fk_Activities_ActivityTypes1`
    FOREIGN KEY (`ActivityTypes_Id`)
    REFERENCES `Enviromap`.`ActivityTypes` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Activities_Users1`
    FOREIGN KEY (`Users_Id`)
    REFERENCES `Enviromap`.`Users` (`Id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Activities_Problems1`
    FOREIGN KEY (`Problems_Id`)
    REFERENCES `Enviromap`.`Problems` (`Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `Documents` (
`Id` INT NOT NULL AUTO_INCREMENT,
`Title` VARCHAR(50) NOT NULL,
`Content` VARCHAR(500) ,
`Alias` VARCHAR(50) NULL,
PRIMARY KEY (`Id`))
ENGINE = InnoDB;


