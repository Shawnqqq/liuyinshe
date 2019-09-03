/*
 Navicat Premium Data Transfer

 Source Server         : 111
 Source Server Type    : MySQL
 Source Server Version : 100316
 Source Host           : 127.0.0.1:3306
 Source Schema         : liuyinshe_v3

 Target Server Type    : MySQL
 Target Server Version : 100316
 File Encoding         : 65001

 Date: 03/09/2019 17:33:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `course_id` int(11) NULL DEFAULT NULL,
  `price` decimal(65, 2) NULL DEFAULT 0,
  `lesson_count` int(11) NULL DEFAULT NULL,
  `status` tinyint(4) NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT current_timestamp(0),
  `start_at` date NULL DEFAULT NULL,
  `end_at` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES (1, '三年二班23', 'upupupup!', 2, 120.00, 5, 1, '2019-08-06 14:56:31', '2019-08-22', '2019-09-22');
INSERT INTO `class` VALUES (2, '三年二班2', 'upupupup!', 1, 120.00, 5, 2, '2019-08-06 15:05:19', '2019-08-21', '2019-09-21');
INSERT INTO `class` VALUES (3, '三年二班3', 'upupupup!', 3, 120.00, 5, 0, '2019-08-06 15:05:56', '2019-08-21', '2019-09-21');
INSERT INTO `class` VALUES (4, '105班', 'upupupup!', 3, 200.00, 10, 1, '2019-08-21 18:20:46', '2019-08-10', '2019-08-30');
INSERT INTO `class` VALUES (5, '106班', 'upupup！', 2, 200.00, 10, 2, '2019-08-22 11:57:18', '2019-08-01', '2019-08-31');
INSERT INTO `class` VALUES (6, '435班', '', 4, 100.00, 2, 0, '2019-08-22 12:05:05', '2019-08-29', '2019-08-30');
INSERT INTO `class` VALUES (7, '436班', 'upupuup!', 2, 20.00, 1, 2, '2019-08-22 12:06:18', '2019-08-01', '2019-08-03');

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `teacher` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `teacher_phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `isdeleted` tinyint(3) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES (1, '声乐', 'xxxxx11', 'zhou11', '13511111122', 1);
INSERT INTO `course` VALUES (2, '舞蹈', 'a\'a\'a', ' kuang', '13151313232', NULL);
INSERT INTO `course` VALUES (3, '钢琴', 'xxxxx', 'zhou', '13511111111', NULL);
INSERT INTO `course` VALUES (4, '声乐', '哈哈哈', 'kitty', '13511111111', NULL);

-- ----------------------------
-- Table structure for leave
-- ----------------------------
DROP TABLE IF EXISTS `leave`;
CREATE TABLE `leave`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `class_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `lesson_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of leave
-- ----------------------------
INSERT INTO `leave` VALUES (1, '3', '3', '3', '1');
INSERT INTO `leave` VALUES (2, '3', '3', '2', '1');
INSERT INTO `leave` VALUES (3, '3', '3', '1', NULL);
INSERT INTO `leave` VALUES (4, '3', '3', '5', NULL);

-- ----------------------------
-- Table structure for lesson
-- ----------------------------
DROP TABLE IF EXISTS `lesson`;
CREATE TABLE `lesson`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `class_id` int(11) NULL DEFAULT NULL,
  `date` date NULL DEFAULT NULL,
  `start_time` time(0) NULL DEFAULT NULL,
  `end_time` time(0) NULL DEFAULT NULL,
  `status` tinyint(4) NULL DEFAULT NULL,
  `price` decimal(65, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of lesson
-- ----------------------------
INSERT INTO `lesson` VALUES (1, 3, '2019-08-24', '14:00:00', '16:00:00', 1, 24.00);
INSERT INTO `lesson` VALUES (2, 3, '2019-08-06', '09:00:00', '11:15:00', NULL, 24.00);
INSERT INTO `lesson` VALUES (3, 3, '2019-08-01', '09:00:00', '09:15:00', NULL, 24.00);
INSERT INTO `lesson` VALUES (4, 3, '2019-08-13', NULL, '09:00:00', 1, 24.00);
INSERT INTO `lesson` VALUES (5, 3, '2019-08-01', '09:00:00', '12:00:00', 1, 24.00);
INSERT INTO `lesson` VALUES (6, 4, '2019-08-01', '08:45:00', '09:30:00', 0, 20.00);
INSERT INTO `lesson` VALUES (7, 4, NULL, NULL, NULL, NULL, 20.00);
INSERT INTO `lesson` VALUES (8, 4, '2019-08-05', '14:15:00', '17:00:00', 0, 20.00);
INSERT INTO `lesson` VALUES (9, 4, '2019-08-01', '09:00:00', '09:00:00', 0, 20.00);
INSERT INTO `lesson` VALUES (10, 4, '2019-08-20', '09:00:00', '11:30:00', 0, 20.00);
INSERT INTO `lesson` VALUES (11, 4, NULL, '08:45:00', '09:00:00', NULL, 20.00);
INSERT INTO `lesson` VALUES (12, 4, '2019-08-27', '08:45:00', '08:45:00', 1, 20.00);
INSERT INTO `lesson` VALUES (13, 4, NULL, NULL, NULL, NULL, 20.00);
INSERT INTO `lesson` VALUES (14, 4, NULL, NULL, NULL, NULL, 20.00);
INSERT INTO `lesson` VALUES (15, 4, NULL, NULL, NULL, NULL, 20.00);
INSERT INTO `lesson` VALUES (16, 5, NULL, NULL, NULL, NULL, 20.00);
INSERT INTO `lesson` VALUES (17, 5, '2019-08-08', '08:30:00', '08:45:00', 0, 20.00);
INSERT INTO `lesson` VALUES (18, 5, NULL, NULL, NULL, NULL, 20.00);
INSERT INTO `lesson` VALUES (19, 5, NULL, NULL, NULL, NULL, 20.00);
INSERT INTO `lesson` VALUES (20, 5, NULL, NULL, NULL, NULL, 20.00);
INSERT INTO `lesson` VALUES (21, 5, NULL, NULL, NULL, NULL, 20.00);
INSERT INTO `lesson` VALUES (22, 5, NULL, NULL, NULL, NULL, 20.00);
INSERT INTO `lesson` VALUES (23, 5, NULL, NULL, NULL, NULL, 20.00);
INSERT INTO `lesson` VALUES (24, 5, NULL, NULL, NULL, NULL, 20.00);
INSERT INTO `lesson` VALUES (25, 5, NULL, NULL, NULL, NULL, 20.00);
INSERT INTO `lesson` VALUES (26, 6, '2019-08-05', '09:15:00', NULL, NULL, 50.00);
INSERT INTO `lesson` VALUES (27, 6, NULL, NULL, NULL, NULL, 50.00);
INSERT INTO `lesson` VALUES (28, 7, '2019-08-06', '09:15:00', NULL, NULL, 20.00);

-- ----------------------------
-- Table structure for manager
-- ----------------------------
DROP TABLE IF EXISTS `manager`;
CREATE TABLE `manager`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '密码',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机',
  `isdeleted` tinyint(3) NULL DEFAULT NULL COMMENT '删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of manager
-- ----------------------------
INSERT INTO `manager` VALUES (1, '周杰伦2', '123456', '13511111111', NULL);
INSERT INTO `manager` VALUES (2, '财讯通2', '54321', '1352222222', 1);
INSERT INTO `manager` VALUES (3, '周杰伦333', '1234567', '1351111111', 1);
INSERT INTO `manager` VALUES (4, 'miya', '123456', '13333333333', NULL);
INSERT INTO `manager` VALUES (5, '周杰伦3333', '1234569', '13511111111', NULL);
INSERT INTO `manager` VALUES (6, '测试', '1234', '13566666666', 1);
INSERT INTO `manager` VALUES (7, 'Alen', '312331231', '13131441431', NULL);
INSERT INTO `manager` VALUES (8, 'asdfasdfxxxx', '123456', '13544444444', 1);

-- ----------------------------
-- Table structure for payment
-- ----------------------------
DROP TABLE IF EXISTS `payment`;
CREATE TABLE `payment`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `status` tinyint(3) NULL DEFAULT NULL COMMENT '1: 充值 2: 消费 3: 赠送',
  `user_id` int(11) NULL DEFAULT NULL,
  `total` decimal(65, 2) NULL DEFAULT 0,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT current_timestamp(0),
  `manager_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of payment
-- ----------------------------
INSERT INTO `payment` VALUES (1, 1, 1, 0.00, '', '2019-08-01 21:46:21', NULL);
INSERT INTO `payment` VALUES (2, 1, 2, 0.00, '', '2019-08-02 00:00:00', NULL);
INSERT INTO `payment` VALUES (3, 1, 1, 10.00, '', '2019-08-03 21:46:59', NULL);
INSERT INTO `payment` VALUES (4, 2, 1, -100.00, '', '2019-08-04 00:00:00', NULL);
INSERT INTO `payment` VALUES (5, 1, 2, 0.00, '', '2019-08-04 21:50:05', NULL);
INSERT INTO `payment` VALUES (6, 2, 3, 0.00, 'xxx', '2019-08-04 21:51:24', NULL);
INSERT INTO `payment` VALUES (7, 2, 1, 10.00, 'xxx', '2019-08-05 21:51:32', NULL);
INSERT INTO `payment` VALUES (8, 3, 1, 10.00, 'xxx', '2019-08-04 22:43:35', NULL);
INSERT INTO `payment` VALUES (9, 1, 1, 100.00, 'xxx', '2019-08-05 09:38:36', NULL);
INSERT INTO `payment` VALUES (10, 2, 1, -10.00, 'xxx', '2019-08-05 09:39:06', NULL);
INSERT INTO `payment` VALUES (11, 2, 1, -24.00, '用户上课 lesson_id:1', '2019-08-07 10:21:03', NULL);
INSERT INTO `payment` VALUES (12, 2, 1, -24.00, '用户上课 lesson_id:1', '2019-08-07 10:23:20', NULL);
INSERT INTO `payment` VALUES (13, 2, 2, -24.00, '用户ID  2  上课', '2019-08-21 11:12:31', NULL);
INSERT INTO `payment` VALUES (14, 1, 2, 30.00, '', '2019-08-22 15:31:26', NULL);
INSERT INTO `payment` VALUES (15, 2, 1, -24.00, '用户ID  1  上课', '2019-08-22 15:39:42', NULL);
INSERT INTO `payment` VALUES (16, 1, 22, 30.00, '', '2019-08-22 16:00:12', NULL);
INSERT INTO `payment` VALUES (17, 1, 5, 300.00, '1', '2019-08-22 17:11:35', NULL);
INSERT INTO `payment` VALUES (18, 2, 3, -24.00, '用户ID  3  上课', '2019-08-26 17:46:22', NULL);
INSERT INTO `payment` VALUES (19, 2, 2, -24.00, '用户ID  2  上课', '2019-08-26 17:48:14', NULL);
INSERT INTO `payment` VALUES (20, 2, 1, -24.00, '用户ID  1  上课', '2019-08-26 17:50:12', NULL);
INSERT INTO `payment` VALUES (21, 2, 2, -24.00, '用户ID  2  上课', '2019-08-26 18:07:00', NULL);
INSERT INTO `payment` VALUES (22, 2, 2, -24.00, '用户ID  2  上课', '2019-08-26 20:00:23', NULL);
INSERT INTO `payment` VALUES (23, 2, 21, -50.00, '用户ID  21  上课', '2019-08-26 20:03:50', NULL);
INSERT INTO `payment` VALUES (24, 2, 7, -24.00, '用户ID  7  上课', '2019-08-31 16:27:01', NULL);
INSERT INTO `payment` VALUES (25, 2, 3, -24.00, '用户ID  3  补课', '2019-09-03 16:59:59', NULL);
INSERT INTO `payment` VALUES (26, 1, 3, 500.00, '给杰尼龟续命 500', '2019-09-03 17:01:54', NULL);
INSERT INTO `payment` VALUES (27, 2, 3, -24.00, '用户ID  3  补课', '2019-09-03 17:07:32', NULL);
INSERT INTO `payment` VALUES (28, 2, 3, -24.00, '用户ID  3  补课', '2019-09-03 17:08:40', NULL);
INSERT INTO `payment` VALUES (29, 2, 3, -24.00, '用户ID  3  补课', '2019-09-03 17:09:36', NULL);
INSERT INTO `payment` VALUES (30, 2, 3, -24.00, '用户ID  3  补课', '2019-09-03 17:10:05', NULL);
INSERT INTO `payment` VALUES (31, 2, 3, -24.00, '用户ID  3  补课', '2019-09-03 17:22:48', NULL);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '电话',
  `sex` tinyint(3) NULL DEFAULT NULL COMMENT '性别：1 男 2 女',
  `birthday` date NULL DEFAULT NULL COMMENT '出生',
  `sms_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '紧急联系人',
  `sms_phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '紧急联系人',
  `balance` decimal(65, 2) NULL DEFAULT 0 COMMENT '金额',
  `created_at` timestamp(0) NULL DEFAULT current_timestamp(0),
  `openid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '小程序唯一标识符',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '周杰伦1', '13511111112', 1, '1990-07-14', '周妈妈', '13522222222', -52.00, '2019-08-02 16:24:33', NULL);
INSERT INTO `user` VALUES (2, '周杰伦2', '13511111111', 1, '1990-07-14', '周妈妈2', '13522222222', -66.00, '2019-08-02 16:44:19', NULL);
INSERT INTO `user` VALUES (3, '杰尼龟', '13511111111', 1, '1990-07-14', '周妈妈3', '13522222222', 332.00, '2019-08-02 16:53:04', 'o7em15MDf4I3iizGHTMtaaccDOD4');
INSERT INTO `user` VALUES (4, '周杰伦4', '13511111111', 1, '1990-07-14', '周妈妈2', '13522222222', 0.00, '2019-08-04 18:23:29', NULL);
INSERT INTO `user` VALUES (5, '周杰伦5', '13511111111', 1, '1990-07-14', '周妈妈2', '13522222222', 300.00, '2019-08-04 18:23:30', NULL);
INSERT INTO `user` VALUES (6, '周杰伦6', '13511111111', 1, '1990-07-14', '周妈妈2', '13522222222', 0.00, '2019-08-04 18:23:31', NULL);
INSERT INTO `user` VALUES (7, '杰尼龟2', '13511111111', 1, '1990-07-14', '周妈妈2', '13522222222', -24.00, '2019-08-04 18:23:32', '');
INSERT INTO `user` VALUES (8, '周杰伦8', '13511111111', 1, '1990-07-14', '周妈妈2', '13522222222', 0.00, '2019-08-04 18:23:32', NULL);
INSERT INTO `user` VALUES (9, '周杰伦9', '13511111111', 1, '1990-07-14', '周妈妈2', '13522222222', 0.00, '2019-08-04 18:23:33', NULL);
INSERT INTO `user` VALUES (10, '周杰伦10', '13511111111', 1, '1990-07-14', '周妈妈2', '13522222222', 0.00, '2019-08-04 18:23:34', NULL);
INSERT INTO `user` VALUES (11, '周杰伦11', '13511111111', 1, '1990-07-14', '周妈妈2', '13522222222', 0.00, '2019-08-04 18:23:34', NULL);
INSERT INTO `user` VALUES (12, '周杰伦12', '13511111111', 1, '1990-07-14', '周妈妈2', '13522222222', 0.00, '2019-08-04 18:23:35', NULL);
INSERT INTO `user` VALUES (13, '周杰伦13', '13511111111', 1, '1990-07-14', '周妈妈2', '13522222222', 0.00, '2019-08-04 18:23:35', NULL);
INSERT INTO `user` VALUES (14, '周杰伦14', '13511111111', 1, '1990-07-15', '周妈妈2', '13522222222', 0.00, '2019-08-04 18:23:36', NULL);
INSERT INTO `user` VALUES (15, '周杰伦15', '13511111111', 1, '1990-07-16', '周妈妈2', '13522222222', 0.00, '2019-08-04 18:23:36', NULL);
INSERT INTO `user` VALUES (16, '周杰伦16', '13511111111', 1, '1990-07-16', '周妈妈2', '13522222222', 0.00, '2019-08-04 18:23:37', NULL);
INSERT INTO `user` VALUES (17, '周杰伦17', '13511111111', 1, '1990-07-14', '周妈妈2', '13522222222', 0.00, '2019-08-04 18:23:38', NULL);
INSERT INTO `user` VALUES (18, '周杰伦18', '13522222222', 1, '1990-07-14', '周妈妈2', '13522222222', 0.00, '2019-08-04 18:23:38', NULL);
INSERT INTO `user` VALUES (19, '周杰伦19', '13511111111', 1, '1990-07-14', '周妈妈2', '13522222222', 0.00, '2019-08-04 18:23:39', NULL);
INSERT INTO `user` VALUES (20, '想23', '13511111112', 1, '2019-08-06', '粉丝', '13522222222', 0.00, '2019-08-20 09:47:34', NULL);
INSERT INTO `user` VALUES (21, '阿龙', '13131311111', 1, '2010-07-08', '阿龙', '13111111111', -50.00, '2019-08-26 19:59:12', NULL);

-- ----------------------------
-- Table structure for user_class
-- ----------------------------
DROP TABLE IF EXISTS `user_class`;
CREATE TABLE `user_class`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `class_id` int(11) NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT current_timestamp(0),
  `manager_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_class
-- ----------------------------
INSERT INTO `user_class` VALUES (1, 1, 3, '2019-08-07 09:30:59', NULL);
INSERT INTO `user_class` VALUES (2, 2, 3, '2019-08-07 09:31:29', NULL);
INSERT INTO `user_class` VALUES (3, 3, 3, '2019-08-07 09:37:15', NULL);
INSERT INTO `user_class` VALUES (4, 5, 7, '2019-08-23 17:25:02', NULL);
INSERT INTO `user_class` VALUES (5, 7, 7, '2019-08-23 17:29:54', NULL);
INSERT INTO `user_class` VALUES (6, 21, 6, '2019-08-26 20:03:23', NULL);

-- ----------------------------
-- Table structure for user_lesson
-- ----------------------------
DROP TABLE IF EXISTS `user_lesson`;
CREATE TABLE `user_lesson`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `class_id` int(11) NULL DEFAULT NULL,
  `lesson_id` int(11) NULL DEFAULT NULL,
  `status` tinyint(11) NULL DEFAULT NULL,
  `finish_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_lesson
-- ----------------------------
INSERT INTO `user_lesson` VALUES (1, 1, 3, 1, 2, '2019-08-07 10:23:21');
INSERT INTO `user_lesson` VALUES (2, 1, 3, 2, NULL, NULL);
INSERT INTO `user_lesson` VALUES (3, 1, 3, 3, NULL, NULL);
INSERT INTO `user_lesson` VALUES (4, 1, 3, 4, 2, '2019-08-22 15:39:42');
INSERT INTO `user_lesson` VALUES (5, 1, 3, 5, 2, '2019-08-26 17:50:12');
INSERT INTO `user_lesson` VALUES (6, 2, 3, 1, NULL, NULL);
INSERT INTO `user_lesson` VALUES (7, 2, 3, 2, 2, '2019-08-26 20:00:23');
INSERT INTO `user_lesson` VALUES (8, 2, 3, 3, 2, '2019-08-26 18:07:00');
INSERT INTO `user_lesson` VALUES (9, 2, 3, 4, 2, '2019-08-21 11:12:31');
INSERT INTO `user_lesson` VALUES (10, 2, 3, 5, 2, '2019-08-26 17:48:14');
INSERT INTO `user_lesson` VALUES (11, 3, 3, 1, 1, '2019-09-03 15:15:05');
INSERT INTO `user_lesson` VALUES (12, 3, 3, 2, 1, '2019-09-03 15:13:22');
INSERT INTO `user_lesson` VALUES (13, 3, 3, 3, 1, '2019-09-03 17:22:49');
INSERT INTO `user_lesson` VALUES (14, 3, 3, 4, 2, '2019-08-26 17:46:22');
INSERT INTO `user_lesson` VALUES (15, 3, 3, 5, 1, '2019-09-03 17:10:05');
INSERT INTO `user_lesson` VALUES (16, 5, 7, 28, NULL, NULL);
INSERT INTO `user_lesson` VALUES (17, 21, 6, 26, 2, '2019-08-26 20:03:50');
INSERT INTO `user_lesson` VALUES (18, 21, 6, 27, NULL, NULL);
INSERT INTO `user_lesson` VALUES (19, 7, 3, 1, NULL, NULL);
INSERT INTO `user_lesson` VALUES (20, 7, 3, 2, NULL, NULL);
INSERT INTO `user_lesson` VALUES (21, 7, 3, 3, NULL, NULL);
INSERT INTO `user_lesson` VALUES (22, 7, 3, 4, 2, '2019-08-31 16:27:01');
INSERT INTO `user_lesson` VALUES (23, 7, 3, 5, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
