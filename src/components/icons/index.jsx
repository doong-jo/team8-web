import React from 'react';
import PropTypes from 'prop-types';
import Back from './Back';
import Bell from './Bell';
import Bug from './Bug';
import CaretDown from './CaretDown';
import CaretLeft from './CaretLeft';
import CaretRight from './CaretRight';
import CaretUp from './CaretUp';
import Chapter from './Chapter';
import ChartPie from './ChartPie';
import CheckSelect from './CheckSelect';
import ChevronDoubleLeft from './ChevronDoubleLeft';
import ChevronDoubleRight from './ChevronDoubleRight';
import ChevronDown from './ChevronDown';
import ChevronLeft from './ChevronLeft';
import ChevronRight from './ChevronRight';
import ChevronUp from './ChevronUp';
import Circle from './Circle';
import CodePractice from './CodePractice';
import Comment from './Comment';
import Complete from './Complete';
import Confirm from './Confirm';
import Connection from './Connection';
import Control from './Control';
import Copy from './Copy';
import Course from './Course';
import CourseHistory from './CourseHistory';
import CourseManagement from './CourseManagement';
import CourseSetting from './CourseSetting';
import Download from './Download';
import Emergency from './Emergency';
import Exam from './Exam';
import ExamList from './ExamList';
import ExamManagement from './ExamManagement';
import ExclamationTriangle from './ExclamationTriangle';
import ExclamationCircle from './ExclamationCircle';
import ExternalLink from './ExternalLink';
import File from './File';
import Flag from './Flag';
import Help from './Help';
import Image from './Image';
import Indeterminate from './Indeterminate';
import Infomation from './Infomation';
import InputSetting from './InputSetting';
import List from './List';
import Mail from './Mail';
import MarkMode from './MarkMode';
import Menu from './Menu';
import Minus from './Minus';
import MinusCircle from './MinusCircle';
import Movie from './Movie';
import PlayMode from './PlayMode';
import Plus from './Plus';
import PracticeContents from './PracticeContents';
import Preset from './Preset';
import Price from './Price';
import Print from './Print';
import Qna from './Qna';
import Refresh from './Refresh';
import Reply from './Reply';
import ResultManagement from './ResultManagement';
import Search from './Search';
import Setting from './Setting';
import StarEmpty from './StarEmpty';
import StarFill from './StarFill';
import Stop from './Stop';
import StudentManagement from './StudentManagement';
import SubmitMode from './SubmitMode';
import Syllabus from './Syllabus';
import Terminal from './Terminal';
import Times from './Times';
import User from './User';
import ViewExpand from './ViewExpand';
import ViewScroll from './ViewScroll';
import ZoomIn from './ZoomIn';
import ZoomOut from './ZoomOut';

function Icon({ iconId, ...iconProps }) {
	const IconComponents = {
		back: Back,
		bell: Bell,
        bug: Bug,
		'caret-down': CaretDown,
		'caret-left': CaretLeft,
		'caret-right': CaretRight,
		'caret-up': CaretUp,
		chapter: Chapter,
		'chart-pie': ChartPie,
		'check-select': CheckSelect,
		'chevron-double-left': ChevronDoubleLeft,
		'chevron-double-right': ChevronDoubleRight,
		'chevron-down': ChevronDown,
		'chevron-left': ChevronLeft,
		'chevron-right': ChevronRight,
		'chevron-up': ChevronUp,
		circle: Circle,
		'code-practice': CodePractice,
		comment: Comment,
		complete: Complete,
		confirm: Confirm,
		connection: Connection,
		control: Control,
		copy: Copy,
		course: Course,
		'course-history': CourseHistory,
		'course-management': CourseManagement,
		'course-setting': CourseSetting,
		download: Download,
		exam: Exam,
		'exam-list': ExamList,
		'exam-management': ExamManagement,
        'exclamation-triangle': ExclamationTriangle,
        'exclamation-circle': ExclamationCircle,
        'external-link': ExternalLink,
        'emergency': Emergency,
		file: File,
		flag: Flag,
		help: Help,
		image: Image,
		indeterminate: Indeterminate,
		infomation: Infomation,
		'input-setting': InputSetting,
		list: List,
		mail: Mail,
		'mark-mode': MarkMode,
		menu: Menu,
		minus: Minus,
        'minus-circle': MinusCircle,
		movie: Movie,
		'play-mode': PlayMode,
		plus: Plus,
		'practice-contents': PracticeContents,
		preset: Preset,
		price: Price,
		print: Print,
		qna: Qna,
		refresh: Refresh,
		reply: Reply,
		'result-management': ResultManagement,
		search: Search,
		setting: Setting,
		'star-empty': StarEmpty,
		'star-fill': StarFill,
		stop: Stop,
		'student-management': StudentManagement,
		'submit-mode': SubmitMode,
		syllabus: Syllabus,
		terminal: Terminal,
		times: Times,
		user: User,
		'view-expand': ViewExpand,
		'view-scroll': ViewScroll,
		'zoom-in': ZoomIn,
		'zoom-out': ZoomOut,
	};
	const IconName = IconComponents[iconId];
	return (
		<IconName {...iconProps} />
	);
}

Icon.defaultProps = {
	size: '16px',
	color: 'currentColor',
	onClick: () => {},
	style: {},
};

Icon.propTypes = {
	iconId: PropTypes.string.isRequired,
	size: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.objectOf(PropTypes.string),
};

export default Icon;
