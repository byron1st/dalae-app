export type Scripts = {
	empty: Script;
	en: Script;
	ko: Script;
};

export type Script = {
	appTitle: string;
	appDescription: string;
	profile: string;
	email: string;
	signout: string;
	signin: string;
	update: string;
	cancel: string;
	delete: string;
	'landingpage.gotoapp': string;
	'momentinput.date.modal.header': string;
	'momentinput.record': string;
	'momentinput.textarea.placeholder': string;
	'momentinput.tag.input': string;
	'momentinput.tag.modal.header': string;
	'momentupdate.modal.header': string;
	'momentinput.error.emptytext': string;
	'moment.showmore': string;
	'moments.listmore': string;
	'moments.loaderror': string;
};

const scripts: Scripts = {
	empty: {
		appTitle: '',
		appDescription: '',
		profile: '',
		email: '',
		signout: '',
		signin: '',
		update: '',
		cancel: '',
		delete: '',
		'landingpage.gotoapp': '',
		'momentinput.date.modal.header': '',
		'momentinput.record': '',
		'momentinput.textarea.placeholder': '',
		'momentinput.tag.input': '',
		'momentinput.tag.modal.header': '',
		'momentinput.error.emptytext': '',
		'momentupdate.modal.header': '',
		'moment.showmore': '',
		'moments.listmore': '',
		'moments.loaderror': ''
	},

	en: {
		appTitle: 'Dalae',
		appDescription: 'record short moments of your daily life to remember',
		profile: 'Profile',
		email: 'Email',
		signout: 'Sign Out',
		signin: 'Sign In',
		update: 'Update',
		cancel: 'Cancel',
		delete: 'Delete',
		'landingpage.gotoapp': 'Go to the App',
		'momentinput.date.modal.header': 'Select a date',
		'momentinput.record': 'Record',
		'momentinput.textarea.placeholder': 'Please enter your content',
		'momentinput.tag.input': 'New tag...',
		'momentinput.tag.modal.header': 'Add tags',
		'momentinput.error.emptytext': 'empty text',
		'momentupdate.modal.header': 'Update Moment',
		'moment.showmore': 'more',
		'moments.listmore': 'load more',
		'moments.loaderror': 'Failed to load data from the server'
	},

	ko: {
		appTitle: '달래',
		appDescription: '일상의 짧은 순간을 기록하여 기억하세요',
		profile: '프로필',
		email: '이메일',
		signout: '로그아웃',
		signin: '로그인',
		update: '수정',
		cancel: '취소',
		delete: '삭제',
		'landingpage.gotoapp': '앱으로 이동',
		'momentinput.date.modal.header': '날짜를 선택하세요',
		'momentinput.record': '생성',
		'momentinput.textarea.placeholder': '내용을 입력하세요',
		'momentinput.tag.input': '새로운 태그',
		'momentinput.tag.modal.header': '태그를 입력하세요',
		'momentinput.error.emptytext': '빈 내용입니다',
		'momentupdate.modal.header': '내용 수정',
		'moment.showmore': '더보기',
		'moments.listmore': '더 불러오기',
		'moments.loaderror': '서버로부터 데이터를 받아오는데 문제가 발생했습니다'
	}
};

export default scripts;
