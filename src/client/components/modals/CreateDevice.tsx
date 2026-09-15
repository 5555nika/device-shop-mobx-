import { Button, Form, Input, Modal, Row, Col, Select, message, Upload } from "antd"
import { UploadOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons"
import { useState } from "react"
import { useStore } from "../../context"
import { observer } from "mobx-react-lite"
import { createDevice } from "../../http/DeviceAPI"
import type { AxiosError } from "axios"
import type { UploadFile } from "antd"

export interface ICreateDevice {
    open: boolean
    onCancel: () => void
}

export const CreateDevice = observer(({ open, onCancel }: ICreateDevice) => {
    const { device } = useStore()
    const [form] = Form.useForm()
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [isloading, setIsloading] = useState(false)

    const watchedTypeId = Form.useWatch('typeId', form)
    const selectedType = device.types.find(t => t.id === watchedTypeId);
    const watchedBrandId = Form.useWatch('brandId', form);
    const selectedBrand = device.brands.find(b => b.id === watchedBrandId);

    const handleClose = () => {
        form.resetFields()
        setFileList([])
        onCancel()
    }

    // Отправка формы на сервер
    const handleOk = async () => {
        try {
            const values = await form.validateFields()

            const fileToUpload = fileList[0]?.originFileObj || (fileList[0] as unknown as File)

            if (!fileToUpload) {
                message.error("Пожалуйста, прикрепите изображение товара!")
                return
            }

            setIsloading(true)

            const formData = new FormData()
            formData.append('name', values.name)
            formData.append('price', String(values.price))
            formData.append('brandId', String(values.brandId))
            formData.append('typeId', String(values.typeId))
            formData.append('img', fileToUpload)

            // Если добавлены характеристики через Form.List, упаковываем их в JSON
            if (values.info && values.info.length > 0) {
                formData.append('info', JSON.stringify(values.info))
            }

            const newDevice = await createDevice(formData)

            // Реактивно добавляем созданный девайс в MobX store
            device.setDevices([...device.devices, newDevice])

            message.success(`Устройство "${values.name}" успешно добавлено!`)
            handleClose()
        } catch (e: unknown) {
            const err = e as AxiosError<{ message: string }>
            const errorMessage = err.response?.data?.message || 'Ошибка при создании товара'
            console.error('Ошибка добавления устройства:', e)
            message.error(errorMessage)
        } finally {
            setIsloading(false)
        }
    }

    return (
        <Modal
            title="Добавить новое устройство"
            open={open}
            onCancel={handleClose}
            onOk={handleOk}
            confirmLoading={isloading}
            okText="Создать товар"
            cancelText="Отмена"
            width={720}
            destroyOnClose
        >
            <Form 
                form={form} 
                layout="vertical"
                initialValues={{ info: [] }}
                style={{ marginTop: 16 }}
            >
                {/* 1. Выбор категории и бренда в одну строку */}
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                        label={selectedType ? `Категория (Выбрано: ${selectedType.name})` : 'Категория (Тип)'}
                            name="typeId"
                            rules={[{ required: true, message: 'Выберите категорию!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Выберите категорию"
                                options={device.types.map(type => 
                                    ({ value: type.id, label: type.name }))}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                        <Form.Item
                            label={selectedBrand ? `Бренд (Выбрано: ${selectedBrand.name})` : 'Бренд'}
                            name="brandId"
                            rules={[{ required: true, message: 'Выберите бренд!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Выберите  бренд"
                                options={device.brands.map(brand => ({ value: brand.id, label: brand.name }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                {/* 2. Название и Цена */}
                <Row gutter={16}>
                    <Col xs={24} sm={16}>
                        <Form.Item
                            label="Название устройства"
                            name="name"
                            rules={[{ required: true, message: 'Введите название устройства!' }]}
                        >
                            <Input placeholder="Например: iPhone 15 Pro 256GB" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={8}>
                        <Form.Item
                            label="Стоимость (₽)"
                            name="price"
                            rules={[
                                { required: true, message: 'Введите цену!' },
                                {
                                    validator: (_, value) => 
                                        value > 0 ? Promise.resolve() : Promise.reject(new Error('Цена должна быть больше 0'))
                                }
                            ]}
                        >
                            <Input type="number" placeholder="99000" min={1} />
                        </Form.Item>
                    </Col>
                </Row>

                {/* 3. Загрузка фотографии */}
                <Form.Item 
                    label="Фотография товара" 
                    required
                    extra="Форматы: JPG, PNG, WEBP. Размер до 5 МБ."
                >
                    <Upload
                        beforeUpload={() => false} // Отменяем автоматическую отправку на сервер
                        maxCount={1}
                        fileList={fileList}
                        onChange={({ fileList }) => setFileList(fileList)}
                        listType="picture"
                    >
                        {fileList.length === 0 && (
                            <Button icon={<UploadOutlined />}>Выбрать изображение</Button>
                        )}
                    </Upload>
                </Form.Item>

                {/* 4. Динамические характеристики через современный Form.List */}
                <div style={{ marginTop: 24, marginBottom: 8, borderTop: '1px solid #f0f0f0', paddingTop: 16 }}>
                    <h4 style={{ margin: '0 0 12px 0' }}>Характеристики устройства</h4>
                    
                    <Form.List name="info">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Row key={key} gutter={12} align="middle" style={{ marginBottom: 12 }}>
                                        <Col span={10}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'title']}
                                                rules={[{ required: true, message: 'Укажите свойство' }]}
                                                style={{ marginBottom: 0 }}
                                            >
                                                <Input placeholder="Свойство (напр. Память)" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={11}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'description']}
                                                rules={[{ required: true, message: 'Укажите значение' }]}
                                                style={{ marginBottom: 0 }}
                                            >
                                                <Input placeholder="Значение (напр. 256 ГБ)" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={3} style={{ textAlign: 'center' }}>
                                            <Button
                                                type="text"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() => remove(name)}
                                            />
                                        </Col>
                                    </Row>
                                ))}

                                <Form.Item style={{ marginTop: 8, marginBottom: 0 }}>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                    >
                                        Добавить характеристику
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </div>
            </Form>
        </Modal>
    )
})