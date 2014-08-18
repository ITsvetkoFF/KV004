SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';


USE `enviromap` ;

-- -----------------------------------------------------
-- Table `Enviromap_schema`.`ProblemStatus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Enviromap_schema`.`ProblemStatus` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `ProbStatus` VARCHAR(20) NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Enviromap_schema`.`ProblemTypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Enviromap_schema`.`ProblemTypes` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `ProbType` VARCHAR(45) NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Enviromap_schema`.`Problems`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Enviromap_schema`.`Problems` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Title` VARCHAR(70) NULL,
  `Content` VARCHAR(500) NULL,
  `Severity` TINYINT UNSIGNED NULL,
  `Moderation` TINYINT(1) NULL,
  `Votes` SMALLINT UNSIGNED NULL,
  `Lat` FLOAT(9,6) NULL,
  `Lon` FLOAT(9,6) NULL,
  `ProblemStatus_Id` INT NOT NULL,
  `ProblemTypes_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC),
  INDEX `fk_Problems_ProblemStatus1_idx` (`ProblemStatus_Id` ASC),
  INDEX `fk_Problems_ProblemTypes1_idx` (`ProblemTypes_Id` ASC),
  CONSTRAINT `fk_Problems_ProblemStatus1`
    FOREIGN KEY (`ProblemStatus_Id`)
    REFERENCES `Enviromap_schema`.`ProblemStatus` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Problems_ProblemTypes1`
    FOREIGN KEY (`ProblemTypes_Id`)
    REFERENCES `Enviromap_schema`.`ProblemTypes` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Enviromap_schema`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Enviromap_schema`.`Users` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NULL,
  `Surname` VARCHAR(45) NULL,
  `Email` VARCHAR(45) NULL,
  `Password` CHAR(64) NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Enviromap_schema`.`Photos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Enviromap_schema`.`Photos` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `PhotoLink` VARCHAR(100) NULL,
  `PhotoStatus` TINYINT(1) NULL,
  `Problems_id` INT NOT NULL,
  `Users_Id` INT NOT NULL,
  PRIMARY KEY (`Id`, `Problems_id`),
  INDEX `fk_Photos_Problems1_idx` (`Problems_id` ASC),
  INDEX `fk_Photos_Users1_idx` (`Users_Id` ASC),
  CONSTRAINT `fk_Photos_Problems1`
    FOREIGN KEY (`Problems_id`)
    REFERENCES `Enviromap_schema`.`Problems` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Photos_Users1`
    FOREIGN KEY (`Users_Id`)
    REFERENCES `Enviromap_schema`.`Users` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Enviromap_schema`.`ActivityTypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Enviromap_schema`.`ActivityTypes` (
  `Id` INT NOT NULL,
  `ActivityName` VARCHAR(45) NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Enviromap_schema`.`Activities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Enviromap_schema`.`Activities` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `ActivityContent` VARCHAR(500) NULL,
  `ActivityDate` DATE NULL,
  `ActivityTypes_Id` INT NOT NULL,
  `Users_Id` INT NOT NULL,
  `Problems_Id` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Activities_ActivityTypes1_idx` (`ActivityTypes_Id` ASC),
  INDEX `fk_Activities_Users1_idx` (`Users_Id` ASC),
  INDEX `fk_Activities_Problems1_idx` (`Problems_Id` ASC),
  CONSTRAINT `fk_Activities_ActivityTypes1`
    FOREIGN KEY (`ActivityTypes_Id`)
    REFERENCES `Enviromap_schema`.`ActivityTypes` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Activities_Users1`
    FOREIGN KEY (`Users_Id`)
    REFERENCES `Enviromap_schema`.`Users` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Activities_Problems1`
    FOREIGN KEY (`Problems_Id`)
    REFERENCES `Enviromap_schema`.`Problems` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
