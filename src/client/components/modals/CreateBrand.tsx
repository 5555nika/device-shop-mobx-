import { Modal, Form, Input, message } from "antd"
import { createBrand } from "../../http/DeviceAPI"

export interface ICreateBrand {
    open: boolean,
    onCancel: () => void
}
export const CreateBrand = ({ open, onCancel }: ICreateBrand) => {
    const [form] = Form.useForm()

    const handleOk = async () => {
        try {
            const values = await form.validateFields()
            await createBrand({id: 0, name: values.name})
            form.resetFields()
            message.success(`Бренд "${values.name}" успешно добавлен!`)
            onCancel()
        } catch (error) {
            console.error('Ошибка:', error)
        }

    }

    return (
        <Modal
        title='Добавить бренд'
        open={open}
        onCancel={onCancel}
        okText='Добавить'
        cancelText='Отмена'
        onOk={handleOk}
        >
            <Form form={form}  >
                <Form.Item
                label='Название бренда'
                name='name'
                rules={[{ required: true, message: 'Пожалуйста, Введите название бренда!' }]}
                >
                    <Input placeholder="Введите название бренда" />
                </Form.Item>
            </Form>
            
        </Modal>
    )
}