# 数据库初始化脚本 - 创建表结构并添加样例硬件数据
from app import app, db, Hardware, Benchmark
from datetime import datetime, timedelta
import random

def create_sample_data():
    """创建示例硬件和性能数据"""
    
    # 添加硬件设备
    hardware_data = [
        {"name": "NVIDIA GeForce RTX 4090", "category": "GPU", "manufacturer": "NVIDIA"},
        {"name": "AMD Radeon RX 7900 XTX", "category": "GPU", "manufacturer": "AMD"},
        {"name": "Intel Core i9-13900K", "category": "CPU", "manufacturer": "Intel"},
        {"name": "Apple M2 Ultra", "category": "SOC", "manufacturer": "Apple"},
        {"name": "Google TPU v4", "category": "TPU", "manufacturer": "Google"},
    ]
    
    hardware_objects = []
    for hw in hardware_data:
        h = Hardware(**hw)
        db.session.add(h)
        hardware_objects.append(h)
    
    db.session.commit()
    
    # 测试类型和指标
    test_types = ["图像分类", "目标检测", "语言模型", "图像生成"]
    metrics = ["TFLOPS", "延迟(ms)", "功耗(W)", "训练时间(min)"]
    
    # 为每个硬件添加性能数据
    for hardware in hardware_objects:
        for _ in range(10):  # 每个硬件10条性能数据
            bm = Benchmark(
                hardware_id=hardware.id,
                test_type=random.choice(test_types),
                metric=random.choice(metrics),
                value=random.uniform(5, 300),
                created_at=datetime.utcnow() - timedelta(days=random.randint(0, 365))
            )
            db.session.add(bm)
    
    db.session.commit()
    print("数据库初始化完成，添加了5个硬件设备和50条性能记录")

def main():
    print("正在创建数据库表结构...")
    with app.app_context():
        db.create_all()
        create_sample_data()

if __name__ == '__main__':
    main()
