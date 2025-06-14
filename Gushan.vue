<template>
  <FuzhouPageBackground type="nature">
    <div class="highlight-detail">
      <!-- 页面标题区域 -->
      <div class="page-header">
        <h1>鼓山风景区</h1>
        <div class="subtitle">福州第一名山 | 文化自然和谐共生的山水胜地</div>
        <FuzhouWaveDivider position="bottom" color="nature" />
      </div>
      
      <!-- 主要内容区域 -->
      <div class="content-container">
        <div class="gallery-section">
          <FuzhouImageHover 
            src="https://source.unsplash.com/1200x600/?mountain,china,temple" 
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
          
          <p>鼓山风景区位于福州市北郊，距市中心14公里，是国家AAAA级旅游景区，素有"榕城第一山"之称。鼓山主峰海拔925米，形似古琴，气势磅礴、风光秀丽，山顶清凉宜人、云雾缭绕，是福州人避暑纳凉的理想去处。</p>
          
          <p>鼓山又名灵山、清凉山，南麓矗立着始建于唐代的涌泉寺，为福州禅宗祖庭，有"中国东南佛教名山"之誉。山上古迹众多，有千年古刹、摩崖石刻、崖墓群等，其中鼓山摩崖石刻有"榕城唯一的户外博物馆"之称，是我国珍贵的石刻艺术宝库。</p>
          
          <p>整个风景区还有白云洞、冷泉、林阴道、白马庵、开元岩等20多处景点，集自然山光水色与悠久佛教文化、名人文化为一体，形成了"清幽长寿名山"的特色。站在鼓山之巅，可俯瞰整个福州城市风貌，远眺闽江入海口，天气晴好时甚至可见台湾海峡。</p>
        </el-card>
        
        <el-card class="features-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>景点亮点</h2>
            </div>
          </template>
          
          <div class="feature-items">
            <div class="feature-item">
              <div class="feature-icon nature-icon">
                <el-icon><Place /></el-icon>
              </div>
              <div class="feature-content">
                <h3>涌泉寺</h3>
                <p>创建于唐代，福州禅宗祖庭，以古朴幽静闻名，殿宇重重，钟鼓楼、大雄宝殿、藏经阁等古建筑保存完好。</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon nature-icon">
                <el-icon><Reading /></el-icon>
              </div>
              <div class="feature-content">
                <h3>摩崖石刻</h3>
                <p>保存着唐宋以来的上千方摩崖石刻，书法风格多样，是研究中国古代书法艺术的重要资料。</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon nature-icon">
                <el-icon><Cloudy /></el-icon>
              </div>
              <div class="feature-content">
                <h3>白云洞景区</h3>
                <p>山势峻峭，林木葱郁，洞内石笋、石柱、石幔、石帘琳琅满目，形态各异，被誉为"天下第一洞"。</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon nature-icon">
                <el-icon><Mug /></el-icon>
              </div>
              <div class="feature-content">
                <h3>冷泉奇观</h3>
                <p>鼓山冷泉，四季恒温，水质清冽甘甜，具有养生功效，是福州的著名天然矿泉水源地之一。</p>
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
              <p>全年开放，每天 7:30-17:30。春秋两季最佳，夏季可避暑纳凉，冬季可观云海日出。</p>
            </div>
            
            <div class="tip-item">
              <h3>交通指南</h3>
              <p>可乘坐16、58、74、306路公交车到鼓山风景区站下车。也可选择专线旅游巴士或出租车前往。</p>
            </div>
            
            <div class="tip-item">
              <h3>门票信息</h3>
              <p>景区门票45元/人，学生半价。白云洞、涌泉寺等景点需另购门票，建议购买联票。</p>
            </div>
            
            <div class="tip-item">
              <h3>游览提示</h3>
              <p>山上温差较大，请准备合适衣物。爬山需穿舒适鞋子，带足饮用水。风景区内有索道可选择。</p>
            </div>
          </div>
        </el-card>
        
        <!-- 360°全景体验 -->
        <el-card class="panorama-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>山顶全景</h2>
            </div>
          </template>
          
          <div class="panorama-content">
            <div class="panorama-placeholder">
              <div class="panorama-overlay">
                <img src="https://source.unsplash.com/1200x600/?mountain,panorama,view" alt="鼓山全景">
                <div class="panorama-play">
                  <el-button type="success" round>
                    <el-icon><View /></el-icon>
                    360°全景体验
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </el-card>
        
        <!-- 登山路线 -->
        <el-card class="route-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>登山路线</h2>
            </div>
          </template>
          
          <div class="route-content">
            <el-steps direction="vertical" :active="3">
              <el-step title="风景区大门" description="购票入口，有详细的景区地图和指引。">
                <template #icon>
                  <el-icon><Guide /></el-icon>
                </template>
              </el-step>
              <el-step title="涌泉寺" description="可先参观千年古刹，领略佛教文化。">
                <template #icon>
                  <el-icon><Place /></el-icon>
                </template>
              </el-step>
              <el-step title="摩崖石刻区" description="沿途欣赏各朝代名人墨宝。">
                <template #icon>
                  <el-icon><Reading /></el-icon>
                </template>
              </el-step>
              <el-step title="主峰" description="登顶远眺，福州全景尽收眼底。">
                <template #icon>
                  <el-icon><Flag /></el-icon>
                </template>
              </el-step>
              <el-step title="白云洞" description="下山途中可游览神秘洞穴。">
                <template #icon>
                  <el-icon><Cloudy /></el-icon>
                </template>
              </el-step>
            </el-steps>
            
            <div class="route-note">
              <el-alert
                title="登山提示"
                type="success"
                description="全程约4-5小时，体力不支者可选择乘坐索道。山路崎岖，请穿防滑鞋。"
                :closable="false"
                show-icon
              />
            </div>
          </div>
        </el-card>
      </div>
      
      <FuzhouWaveDivider position="bottom" color="sea" />
      
      <!-- 附近景点推荐 -->
      <div class="nearby-attractions">
        <h2>附近景点推荐</h2>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card class="recommendation-card" shadow="hover">
              <img src="https://source.unsplash.com/500x300/?hot,spring" alt="青云山温泉">
              <div class="card-content">
                <h3>青云山温泉</h3>
                <p>距离：约15公里</p>
                <el-button type="success" plain size="small" @click="router.push('/highlights/hot-springs')">查看详情</el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card class="recommendation-card" shadow="hover">
              <img src="https://source.unsplash.com/500x300/?chinese,garden" alt="西湖公园">
              <div class="card-content">
                <h3>西湖公园</h3>
                <p>距离：约10公里</p>
                <el-button type="success" plain size="small" @click="router.push('/attractions?name=西湖公园')">查看详情</el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card class="recommendation-card" shadow="hover">
              <img src="https://source.unsplash.com/500x300/?chinese,historical,street" alt="三坊七巷">
              <div class="card-content">
                <h3>三坊七巷</h3>
                <p>距离：约12公里</p>
                <el-button type="success" plain size="small" @click="router.push('/highlights/sanfang-qixiang')">查看详情</el-button>
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
import { Place, Reading, Cloudy, Mug, View, Guide, Flag } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import FuzhouPageBackground from '@/components/FuzhouPageBackground.vue';
import FuzhouWaveDivider from '@/components/FuzhouWaveDivider.vue';
import FuzhouImageHover from '@/components/FuzhouImageHover.vue';

const router = useRouter();

const additionalImages = [
  'https://source.unsplash.com/500x300/?buddhist,temple,china',
  'https://source.unsplash.com/500x300/?mountain,forest,green', 
  'https://source.unsplash.com/500x300/?stone,carving,chinese'
];
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

$fuzhou-nature: #7bae37;  // 确保颜色变量定义在scss文件顶部

.highlight-detail {
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto;
  
  /* 添加全局媒体查询以明确定义breakpoint */
  @media (max-width: 768px) {
    padding: 10px;
  }
  @media (max-width: 992px) {
    padding: 15px;
  }
  
  .page-header {
    text-align: center;
    margin-bottom: 40px;
    
    h1 {
      font-size: 2.8rem;
      color: $fuzhou-nature;
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
    border-radius: 8px;
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
      border-bottom: 1px solid rgba($fuzhou-nature, 0.1);
      
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
          background-color: $fuzhou-nature;
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
      border-radius: 8px;
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
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        
        &.nature-icon {
          background-color: rgba($fuzhou-nature, 0.1);
          
          .el-icon {
            color: $fuzhou-nature;
            font-size: 26px;
          }
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
        color: $fuzhou-nature;
      }
      
      p {
        margin: 0;
        color: $text-secondary;
        line-height: 1.6;
      }
    }
  }
  
  .panorama-section {
    .panorama-content {
      padding: 10px 0;
    }
    
    .panorama-placeholder {
      width: 100%;
      height: 400px;
      background-color: #f5f5f5;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
      
      .panorama-overlay {
        position: relative;
        width: 100%;
        height: 100%;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .panorama-play {
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
  
  .route-section {
    .route-content {
      padding: 10px 0;
    }
    
    .route-note {
      margin-top: 20px;
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