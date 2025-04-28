const noticeRepository = require('../repositories/notice.repository');
const dayjs = require('dayjs');

class noticeService {
    constructor() {
        this.noticeRepository = new noticeRepository();
    }

    getNoticeList = async () => {
        try {
            const result = await this.noticeRepository.getNoticeList();

            const data = [];
            result?.map((lists) => {
                const list = {
                    id: lists.id,
                    type: lists.type,
                    title: lists.title,
                    content: lists.content,
                    createdAt: dayjs(lists.createdAt).format('YYYY-MM-DD'),
                };

                data.push(list);
            });

            const sorted = data.sort((a, b) => {
                if (a.type === '공지' && b.type !== '공지') return -1;
                if (a.type !== '공지' && b.type === '공지') return 1;

                return new Date(b.id) - new Date(a.id);
            });

            return sorted;
        } catch (error) {
            throw error;
        }
    };

    getNoticeDetailById = async (id) => {
        try {
            const result = await this.noticeRepository.getNoticeDetailById(id);

            result.createdAt = dayjs(result.createdAt).format('YYYY-MM-DD');

            return result;
        } catch (error) {
            throw error;
        }
    };

    InsertNotice = async (type, title, content) => {
        try {
            const result = await this.noticeRepository.InsertNotice(type, title, content);

            return result;
        } catch (error) {
            throw error;
        }
    };
}

module.exports = noticeService;
