from flask import Flask, jsonify, request
import random
from datetime import datetime, timedelta
import time

app = Flask(__name__)

# 模拟数据库
hardware_db = [
    {"id": 1, "device": "NVIDIA RTX 4090", "value": 90.5, "created_at": "2023-10-05T14:30:00Z"},
    {"id": 2, "device": "AMD RX 7900 XTX", "value": 78.2, "created_at": "2023-10-05T15:15:00Z"},
    {"id": 3, "device": "Intel Arc A770", "value": 42.3, "created_at": "2023-10-05T16:20:00Z"},
    {"id": 4, "device": "Apple M2 Ultra", "value": 85.7, "created_at": "2023-10-06T09:45:00Z"},
    {"id": 5, "device": "NVIDIA A100", "value": 95.8, "created_at": "2023-10-06T11:30:00Z"}
]

@app.route('/api/comparisons', methods=['GET'])
def get_comparisons():
    """获取硬件性能数据"""
    # 模拟延迟
    time.sleep(0.5)
    return jsonify(hardware_db)

@app.route('/api/benchmark', methods=['POST'])
def run_benchmark():
    """模拟运行性能测试"""
    data = request.json
    device = data.get('device', 'Unknown Device')
    
    # 生成模拟性能数据 (0-100)
    score = round(random.uniform(70.0, 98.0), 1)
    
    # 添加时间戳
    new_entry = {
        "id": len(hardware_db) + 1,
        "device": device,
        "value": score,
        "created_at": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")
    }
    
    hardware_db.append(new_entry)
    return jsonify({"status": "success", "data": new_entry})

if __name__ == '__main__':
    app.run(port=5000, debug=True)