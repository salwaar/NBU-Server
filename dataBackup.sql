USE `o6q0m6uzmz3m4wxl`;
-- Dumping data for table o6q0m6uzmz3m4wxl.aca_adv: ~2 rows (approximately)
/*!40000 ALTER TABLE `aca_adv` DISABLE KEYS */;
INSERT INTO `aca_adv` (`Aca_id`, `Aca_name`, `Dep_id`, `password`) VALUES
	(12345, 'Huda K', 1105, '123456'),
	(98765, 'Lubna T', 1105, '123456');

  -- Dumping data for table o6q0m6uzmz3m4wxl.department: ~6 rows (approximately)
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` (`Dep_id`, `Dep_name`) VALUES
	(1101, 'PHYS'),
	(1102, 'CHM'),
	(1103, 'BIO'),
	(1104, 'MATH'),
	(1105, 'CS'),
	(1602, 'ARABIC');


-- Dumping data for table o6q0m6uzmz3m4wxl.plan: ~40 rows (approximately)
/*!40000 ALTER TABLE `plan` DISABLE KEYS */;
INSERT INTO `plan` (`Sub_id`, `Sub_name`, `Level`, `Hour`, `Dep_id`, `Pre_req_id`) VALUES
	(11050, 'Elective specialization', 8, '3', 1105, null ),
	(110500, 'Elective specialization', 8, '3', 1105, null),
	(1100101, 'Scientific Terminology', 1, '2', 1101, null),
	(1101101, 'General Physic', 1, '4', 1101, null),
	(1102101, 'General chemistry 1', 2, '4', 1102, null),
	(1103101, 'General biology 1', 2, '4', 1103, null),
	(1104101, 'Calculus 1', 1, '4', 1104, null),
	(1104131, 'Statistics', 1, '3', 1104, null),
	(1104222, 'Linear algebra', 5, '3', 1105, 1104101),
	(1105000, 'Elective specialization', 7, '3', 1105, null),
	(1105101, 'Intro. to computer science', 2, '3', 1105, null),
	(1105211, 'Int. to programming', 3, '3', 1105, 1105101),
	(1105212, 'Programming application', 4, '3', 1105, 1105211),
	(1105221, 'Digital logic design', 3, '3', 1105, 1105101),
	(1105222, 'Digital system design', 4, '3', 1105, 1105221),
	(1105231, 'Discrete Mathematics', 3, '3', 1105, 1105221),
	(1105232, 'Computation theory', 4, '3', 1105, 1105231),
	(1105241, 'Data structure', 4, '3', 1105, 1105211),
	(1105281, 'Ethical and pro. practices', 3, '2', 1105, null),
	(1105313, 'Object oriented proogramming', 5, '3', 1105, 1105212),
	(1105314, 'Analysis and design algorithm', 5, '3', 1105, 1105241),
	(1105315, 'Web programming', 6, '3', 1105, 1105313),
	(1105323, 'Computer architecture', 5, '3', 1105, 1105222),
	(1105333, 'Artificial Intelligence ', 6, '3', 1105, 1105232),
	(1105342, 'Database system', 5, '3', 1105, 1105212),
	(1105351, 'Computer graphics', 6, '3', 1105, 1105313),
	(1105361, 'Operating system ', 6, '3', 1105, 1105323),
	(1105371, 'Local area network', 6, '3', 1105, 1105323),
	(1105443, 'Software engneering', 7, '3', 1105, 1105342),
	(1105462, 'Computer system programming', 7, '3', 1105, 1105323),
	(1105463, 'Compiler construction', 8, '3', 1105, 1105462),
	(1105473, 'Distributed computing system', 8, '3', 1105, 1105462),
	(1105491, 'Field training', 7, '3', 1105, null),
	(1105492, 'Graduation project', 8, '3', 1105, null),
	(1105742, 'Wide area network ', 7, '3', 1105, 1105371),
	(1601101, 'Islamic culture 1', 1, '2', 1602, null),
	(1601201, 'Islamic culture 2', 2, '2', 1602, 1601101),
	(1602101, 'Arabic language', 2, '3', 1602, null),
	(16013012, 'Elective islamic culture', 3, '2', 1602, 1601201),
	(16014012, 'Elective islamic culture', 4, '2', 1602, 1601201);

  -- Dumping data for table o6q0m6uzmz3m4wxl.students: ~5 rows (approximately)
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` (`Stu_id`, `Stu_name`, `level`,  `dep_id`, `Address`, `Aca_id`, `password`) VALUES
	(201409537, 'Raqia Ahmed', 4,  1105,  NULL, 12345, '123456' ),
	(201409585, 'Salwa Ali', 7,  1105,  NULL, 98765, '123456'),
	(201409586, 'Hajar Abdulla', 5,  1105,  NULL, 12345, '123456'),
	(201409588, 'Leen Omar', 2,  1105,  NULL, 98765, '123456'),
	(201409589, 'Sawsan Mustfa', 6, 1105,  NULL, 98765, '123456');


-- Dumping data for table o6q0m6uzmz3m4wxl.substu: ~0 rows (approximately)
/*!40000 ALTER TABLE `substu` DISABLE KEYS */;
INSERT INTO `substu` (`Stu_id`, `Sub_id`, `Status`) VALUES
	(201409586, 1105313, 'Succeed'),
	(201409586, 1105314, 'Current'),
	(201409586, 1105315, 'Failed');
	(201409586,1105212, 'Succeed'),
	(201409586,1105443, 'Current'),
   (201409586,1105491, 'Current')