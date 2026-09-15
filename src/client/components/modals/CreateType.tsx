import { Form, Input, message, Modal } from "antd"
import { createType } from "../../http/DeviceAPI"

export interface ICreateType {
    open: boolean,
    onCancel: () => void
}
export const CreateType = ({ open, onCancel }: ICreateType) => {

    const [form] = Form.useForm()

    const handleOk = async () => {
        try {
            // Заставляем форму провериться и отправиться
            const values = await form.validateFields()
            // Отправляем запрос на сервер через наше API
            await createType({id: 0, name: values.name})
            form.resetFields()
            message.success(`Тип "${values.name}" успешно добавлен!`)
            onCancel()   
        } catch (error) {
            console.error('Ошибка:', error)
        }
    }

    return (
        <Modal
        title='Добавить тип'
        open={open}
        onCancel={onCancel}
        onOk={handleOk}
        okText='Добавить'
        cancelText='Отмена'
        >
            <Form form={form} layout="vertical">
                <Form.Item
                name='name'
                label='Название типа'
                rules={[{required: true, message: 'Пожалуйста, Введите название типа!'}]}
                >
                    <Input placeholder="Введите название типа" />
                </Form.Item>
            </Form>           
        </Modal>
    )
}