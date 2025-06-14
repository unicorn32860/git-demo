<template>
  <FuzhouPageBackground type="pattern">
    <div class="highlight-detail">
      <!-- 页面标题区域 -->
      <div class="page-header">
        <h1>三坊七巷</h1>
        <div class="subtitle">中国十大历史文化名街 | 福州历史文化的缩影</div>
        <FuzhouWaveDivider position="bottom" color="brick" />
      </div>
      
      <!-- 主要内容区域 -->
      <div class="content-container">
        <div class="gallery-section">
          <FuzhouImageHover 
            src="@/assets/images/sanfang-qixiang.jpg" 
            height="400"
            :zoom="1.1"
            class="main-image"
          />
          <div class="image-grid">
            <FuzhouImageHover v-for="(img, index) in additionalImages" :key="index" :src="img" height="180" />
          </div>
        </div>
        
        <el-card class="intro-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>景点介绍</h2>
            </div>
          </template>
          
          <p>三坊七巷是中国十大历史文化名街，有着"中国城市里坊制度活化石"的美誉，也是福州市的"城市客厅"，是福州历史上社会精英荟萃之地。这里共有三坊（衣锦坊、文儒坊、光禄坊）、七巷（杨桥巷、郎官巷、塔巷、黄巷、安民巷、宫巷、吉庇巷）和一条中轴线（南后街）组成。</p>
          
          <p>三坊七巷于唐末（公元907年）初具规模。唐代福州城东设衙署，西有民居，北部为军营，南部为寺院，以八字形水系为界，形成"前朱雀、后玄武、左青龙、右白虎"的格局。南宋景定元年（公元1260年）修缮城垣，原先的坊、市、里杂沓布局渐形成三坊七巷的格局，元、明、清三代多有修葺。</p>
          
          <p>三坊七巷积淀深厚的文脉，为中国近代著名思想家严复、爱国诗人林则徐、革命烈士林觉民等众多历史名人的故里。现存大量明清古民居，是一座文物和历史积淀丰厚的"城中城"，这里的建筑以明清两代为主，全为花岗岩和杉木结构，砖木雕花，精致优美，体现了"虽由人做，宛如天开"的工艺，可谓是福州文化的标志和符号。</p>
        </el-card>
        
        <el-card class="features-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>景点亮点</h2>
            </div>
          </template>
          
          <div class="feature-items">
            <div class="feature-item">
              <div class="feature-icon">
                <el-icon><House /></el-icon>
              </div>
              <div class="feature-content">
                <h3>古建筑群</h3>
                <p>保存有159座古民居，多为明清建筑，展示了独特的榕派建筑风格，结构严谨、布局合理、装饰精美。</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">
                <el-icon><Reading /></el-icon>
              </div>
              <div class="feature-content">
                <h3>名人故居</h3>
                <p>严复故居、林觉民故居、冰心故居等名人故居聚集，是福州文化名人荟萃之地。</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">
                <el-icon><Postcard /></el-icon>
              </div>
              <div class="feature-content">
                <h3>文化体验</h3>
                <p>寿山石雕、脱胎漆器、软木画等非遗项目展示与体验，让您近距离感受福州传统工艺的魅力。</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">
                <el-icon><Food /></el-icon>
              </div>
              <div class="feature-content">
                <h3>特色美食</h3>
                <p>古早味肉燕、锅边糊、芋泥、鼎边糊等福州传统小吃，让您品尝原汁原味的福州风味。</p>
              </div>
            </div>
          </div>
        </el-card>
        
        <el-card class="tips-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>参观攻略</h2>
            </div>
          </template>
          
          <div class="tips-content">
            <div class="tip-item">
              <h3>最佳游览时间</h3>
              <p>每天 9:00-22:00，建议游览时间4-5小时。春秋两季气候宜人，最适合游览。</p>
            </div>
            
            <div class="tip-item">
              <h3>交通指南</h3>
              <p>可乘坐1路、5路、11路、22路等公交车在南后街站下车，步行可到达三坊七巷景区入口。</p>
            </div>
            
            <div class="tip-item">
              <h3>门票信息</h3>
              <p>景区免费开放，部分名人故居和展馆需购票，联票价格约30元/人。</p>
            </div>
            
            <div class="tip-item">
              <h3>特色活动</h3>
              <p>节假日期间常有非遗展示、民俗表演等活动，可关注官方微信公众号了解最新活动安排。</p>
            </div>
          </div>
        </el-card>
        
        <!-- 3D虚拟导览 -->
        <el-card class="vr-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>虚拟导览</h2>
            </div>
          </template>
          
          <div class="vr-content">
            <div class="vr-placeholder">
              <div class="vr-overlay">
                <img src="@/assets/images/3d-sanfang.jpg" alt="三坊七巷虚拟导览">
                <div class="vr-play">
                  <el-button type="primary" round>
                    <el-icon><VideoPlay /></el-icon>
                    开启VR之旅
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </el-card>
        
        <!-- 智能语音导览 -->
        <el-card class="audio-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>语音讲解</h2>
            </div>
          </template>
          
          <div class="audio-guide">
            <div class="audio-qr">
              <img src="@/assets/images/qr-sanfang.png" alt="三坊七巷导览码">
            </div>
            <div class="audio-text">
              <h3>扫码听讲解</h3>
              <p>扫描二维码，获取专业导游讲解，深度了解三坊七巷的历史文化和建筑特色。</p>
              <el-button type="primary" plain>
                <el-icon><Headset /></el-icon>
                试听讲解
              </el-button>
            </div>
          </div>
        </el-card>
      </div>
      
      <FuzhouWaveDivider position="bottom" color="tea" />
      
      <!-- 附近景点推荐 -->
      <div class="nearby-attractions">
        <h2>附近景点推荐</h2>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card class="recommendation-card" shadow="hover">
              <img src="@/assets/images/linjuemin.jpg" alt="林觉民故居">
              <div class="card-content">
                <h3>林觉民故居</h3>
                <p>距离：步行5分钟</p>
                <el-button type="primary" plain size="small">查看详情</el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card class="recommendation-card" shadow="hover">
              <img src="@/assets/images/yanfu.jpg" alt="严复故居">
              <div class="card-content">
                <h3>严复故居</h3>
                <p>距离：步行8分钟</p>
                <el-button type="primary" plain size="small">查看详情</el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card class="recommendation-card" shadow="hover">
              <img src="@/assets/images/tea-making.jpg" alt="茶文化体验馆">
              <div class="card-content">
                <h3>茶文化体验馆</h3>
                <p>距离：步行10分钟</p>
                <el-button type="primary" plain size="small">查看详情</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </FuzhouPageBackground>
</template>

<script setup>
import { ref } from 'vue';
import { House, Reading, Food, Postcard, VideoPlay, Headset } from '@element-plus/icons-vue';
import FuzhouPageBackground from '@/components/FuzhouPageBackground.vue';
import FuzhouWaveDivider from '@/components/FuzhouWaveDivider.vue';
import FuzhouImageHover from '@/components/FuzhouImageHover.vue';

// 假设这是从API获取的额外景点图片
const additionalImages = [
  'https://source.unsplash.com/500x300/?chinese,ancient,architecture',
  'https://source.unsplash.com/500x300/?china,traditional,house', 
  'https://source.unsplash.com/500x300/?chinese,courtyard'
];
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.highlight-detail {
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto;
  
  .page-header {
    text-align: center;
    margin-bottom: 40px;
    
    h1 {
      font-size: 2.8rem;
      color: $fuzhou-brick;
      margin-bottom: 5px;
      font-family: 'ZCOOL XiaoWei', sans-serif;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .subtitle {
      font-size: 1.1rem;
      color: $text-secondary;
      margin-bottom: 20px;
    }
  }
  
  .glass-card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(10px);
    border: none;
    border-radius: $border-radius-large;
    overflow: hidden;
    margin-bottom: 30px;
    box-shadow: $box-shadow-light;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: $box-shadow-medium;
    }
    
    .card-header {
      display: flex;
      align-items: center;
      padding-bottom: 15px;
      border-bottom: 1px solid rgba($fuzhou-brick, 0.1);
      
      h2 {
        margin: 0;
        font-size: 1.5rem;
        color: $text-primary;
        font-family: 'ZCOOL QingKe HuangYou', sans-serif;
        position: relative;
        padding-left: 15px;
        
        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 5px;
          height: 20px;
          background-color: $fuzhou-brick;
          border-radius: 3px;
        }
      }
    }
  }
  
  .content-container {
    padding: 0 20px;
  }
  
  .gallery-section {
    margin-bottom: 30px;
    
    .main-image {
      margin-bottom: 15px;
      width: 100%;
      border-radius: $border-radius-large;
      overflow: hidden;
    }
    
    .image-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 15px;
      
      @media (max-width: $breakpoint-sm) {
        grid-template-columns: repeat(1, 1fr);
      }
    }
  }
  
  .intro-section {
    p {
      margin: 0 0 15px;
      line-height: 1.8;
      text-align: justify;
      font-size: 1.05rem;
      color: $text-primary;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  
  .features-section {
    .feature-items {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 30px;
      
      @media (max-width: $breakpoint-md) {
        grid-template-columns: repeat(1, 1fr);
      }
    }
    
    .feature-item {
      display: flex;
      align-items: flex-start;
      
      .feature-icon {
        width: 60px;
        height: 60px;
        min-width: 60px;
        background-color: rgba($fuzhou-brick, 0.1);
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        
        .el-icon {
          font-size: 26px;
          color: $fuzhou-brick;
        }
      }
      
      .feature-content {
        h3 {
          margin: 0 0 10px;
          font-size: 1.2rem;
          color: $text-primary;
        }
        
        p {
          margin: 0;
          color: $text-secondary;
          line-height: 1.6;
        }
      }
    }
  }
  
  .tips-section {
    .tips-content {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 25px;
      
      @media (max-width: $breakpoint-md) {
        grid-template-columns: repeat(1, 1fr);
      }
    }
    
    .tip-item {
      h3 {
        font-size: 1.1rem;
        margin: 0 0 8px;
        color: $fuzhou-brick;
      }
      
      p {
        margin: 0;
        color: $text-secondary;
        line-height: 1.6;
      }
    }
  }
  
  .vr-section {
    .vr-content {
      padding: 10px 0;
    }
    
    .vr-placeholder {
      width: 100%;
      height: 400px;
      background-color: #f5f5f5;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
      
      .vr-overlay {
        position: relative;
        width: 100%;
        height: 100%;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .vr-play {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          
          &:hover {
            background: rgba(0, 0, 0, 0.4);
          }
          
          .el-button {
            font-size: 1.1rem;
            padding: 12px 25px;
            
            .el-icon {
              margin-right: 8px;
            }
          }
        }
      }
    }
  }
  
  .audio-section {
    .audio-guide {
      display: flex;
      align-items: center;
      
      @media (max-width: $breakpoint-sm) {
        flex-direction: column;
        align-items: center;
      }
    }
    
    .audio-qr {
      width: 150px;
      height: 150px;
      min-width: 150px;
      margin-right: 30px;
      
      img {
        width: 100%;
        height: 100%;
      }
      
      @media (max-width: $breakpoint-sm) {
        margin-right: 0;
        margin-bottom: 20px;
      }
    }
    
    .audio-text {
      h3 {
        margin: 0 0 10px;
        font-size: 1.2rem;
        color: $text-primary;
      }
      
      p {
        margin: 0 0 15px;
        color: $text-secondary;
        line-height: 1.6;
      }
    }
  }
  
  .nearby-attractions {
    padding: 40px 20px;
    
    h2 {
      text-align: center;
      margin-bottom: 30px;
      font-family: 'ZCOOL QingKe HuangYou', sans-serif;
      color: $text-primary;
      font-size: 1.8rem;
    }
    
    .recommendation-card {
      overflow: hidden;
      margin-bottom: 20px;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-5px);
      }
      
      img {
        width: 100%;
        height: 180px;
        object-fit: cover;
      }
      
      .card-content {
        padding: 15px;
        
        h3 {
          margin: 0 0 8px;
          font-size: 1.1rem;
          color: $text-primary;
        }
        
        p {
          margin: 0 0 12px;
          color: $text-secondary;
          font-size: 0.9rem;
        }
      }
    }
  }
}
</style> 