<template>
  <FuzhouPageBackground type="sea">
    <div class="highlight-detail">
      <!-- 页面标题区域 -->
      <div class="page-header">
        <h1>闽江夜景</h1>
        <div class="subtitle">福州的璀璨明珠 | 城市与自然的完美交融</div>
        <FuzhouWaveDivider position="bottom" color="sea" />
      </div>
      
      <!-- 主要内容区域 -->
      <div class="content-container">
        <div class="gallery-section">
          <FuzhouImageHover 
            src="@/assets/images/minjiang-night.jpg" 
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
              <h2>夜景介绍</h2>
            </div>
          </template>
          
          <p>闽江是福建省最大的河流，贯穿福州城区，是福州城市的母亲河。闽江夜景是福州城市名片之一，被誉为"东南明珠"。夜幕降临，华灯初上，闽江两岸灯火辉煌，璀璨夺目，水中倒影与灯光交相辉映，勾勒出一幅流动的光影画卷。</p>
          
          <p>闽江夜景最具代表性的景观是沿岸的江滨路和闽江大桥灯光秀。江滨路沿江两岸延伸，建筑群灯光层次分明，金鱼塘音乐喷泉、江滨公园、中洲岛、金山寺等标志性景点在夜间灯光的装点下熠熠生辉。</p>
          
          <p>闽江大桥及沿线多座大桥在夜间开启灯光秀，五颜六色的灯光变幻出各种艺术图案，与江面交相辉映，构成了闽江夜景的精华所在。乘船夜游闽江，欣赏两岸灯光和桥梁灯光秀，是体验福州夜生活的最佳方式之一。</p>
        </el-card>
        
        <el-card class="features-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>景点亮点</h2>
            </div>
          </template>
          
          <div class="feature-items">
            <div class="feature-item">
              <div class="feature-icon sea-icon">
                <el-icon><Ship /></el-icon>
              </div>
              <div class="feature-content">
                <h3>夜游闽江</h3>
                <p>乘坐观光游船，沿闽江顺流而下，欣赏两岸灯光与水中倒影，感受福州之夜的独特魅力，是体验闽江夜景的最佳方式。</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon sea-icon">
                <el-icon><Picture /></el-icon>
              </div>
              <div class="feature-content">
                <h3>桥梁灯光秀</h3>
                <p>闽江上的多座大桥夜间都有精彩的灯光表演，尤其是闽江大桥和江滨大桥的灯光秀，以其变幻莫测的灯光效果吸引众多游客。</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon sea-icon">
                <el-icon><Sunrise /></el-icon>
              </div>
              <div class="feature-content">
                <h3>滨江公园</h3>
                <p>沿闽江两岸分布着多个滨江公园，如江滨公园、仓山公园等，这些公园在夜间灯光的点缀下，成为市民休闲娱乐和观赏夜景的理想场所。</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon sea-icon">
                <el-icon><Goblet /></el-icon>
              </div>
              <div class="feature-content">
                <h3>沿江美食</h3>
                <p>闽江两岸分布着众多特色餐厅和咖啡厅，既可以品尝福州特色美食，又能欣赏闽江夜景，是约会和社交的绝佳选择。</p>
              </div>
            </div>
          </div>
        </el-card>
        
        <!-- 游船体验 -->
        <el-card class="cruise-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>闽江游船体验</h2>
            </div>
          </template>
          
          <div class="cruise-content">
            <div class="cruise-image">
              <img src="https://source.unsplash.com/800x500/?river,cruise,night" alt="闽江夜游">
            </div>
            
            <div class="cruise-info">
              <h3>夜游路线</h3>
              <p>标准游船路线从五一广场码头出发，途经金山寺、江滨公园、闽江大桥、中洲岛，最后返回五一广场。全程约40-60分钟，您可以在船上欣赏到福州城市的最美夜景。</p>
              
              <div class="cruise-details">
                <div class="detail-item">
                  <h4>船票价格</h4>
                  <p>普通船票: 80元/人</p>
                  <p>豪华船票: 120元/人（含简餐）</p>
                </div>
                
                <div class="detail-item">
                  <h4>出发时间</h4>
                  <p>19:30 / 20:30 / 21:30</p>
                  <p>节假日增加班次，请提前咨询</p>
                </div>
                
                <div class="detail-item">
                  <h4>上船地点</h4>
                  <p>五一广场闽江码头（近万达广场）</p>
                  <p>江滨东路码头（近江滨公园）</p>
                </div>
              </div>
              
              <el-button type="primary" class="book-btn">
                <el-icon><Ticket /></el-icon>
                立即预订
              </el-button>
            </div>
          </div>
        </el-card>
        
        <!-- 最佳观景点 -->
        <el-card class="viewpoints-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>最佳观景点</h2>
            </div>
          </template>
          
          <div class="viewpoints-content">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" v-for="(point, index) in viewpoints" :key="index" class="mb-4">
                <div class="viewpoint-item">
                  <div class="viewpoint-image">
                    <img :src="point.image" :alt="point.name">
                  </div>
                  <div class="viewpoint-info">
                    <h3>{{ point.name }}</h3>
                    <div class="rating">
                      <el-rate v-model="point.rating" disabled />
                      <span>{{ point.rating }}分</span>
                    </div>
                    <p>{{ point.description }}</p>
                    <div class="viewpoint-meta">
                      <span><el-icon><Location /></el-icon> {{ point.location }}</span>
                      <span><el-icon><PictureFilled /></el-icon> {{ point.bestTime }}</span>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
        
        <!-- 摄影技巧 -->
        <el-card class="tips-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>摄影技巧</h2>
            </div>
          </template>
          
          <div class="tips-content">
            <div class="tip-item">
              <h3>最佳拍摄时间</h3>
              <p>晚上7点至9点是拍摄闽江夜景的黄金时段，此时天空还有些蓝色，与灯光形成鲜明对比，被摄影师称为"蓝调时刻"。</p>
            </div>
            
            <div class="tip-item">
              <h3>器材建议</h3>
              <p>夜景拍摄建议使用三脚架减少抖动，长曝光可以捕捉更多光线细节，广角镜头可以容纳更广阔的视野。</p>
            </div>
            
            <div class="tip-item">
              <h3>构图技巧</h3>
              <p>利用闽江的曲线和桥梁的线条作为引导线，可以选择对称构图或三分法构图，加入前景增加画面层次感。</p>
            </div>
            
            <div class="tip-item">
              <h3>参数设置</h3>
              <p>低ISO（100-400）减少噪点，小光圈（f/8-f/11）增加景深，曝光时间根据光线条件调整，通常在几秒至几十秒之间。</p>
            </div>
          </div>
        </el-card>
      </div>
      
      <FuzhouWaveDivider position="bottom" color="nature" />
      
      <!-- 活动推荐 -->
      <div class="events-section">
        <h2>相关活动</h2>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card class="event-card" shadow="hover">
              <img src="https://source.unsplash.com/500x300/?lantern,festival" alt="闽江灯光节">
              <div class="card-content">
                <div class="event-date">每年9月-10月</div>
                <h3>闽江灯光艺术节</h3>
                <p>各国灯光艺术家齐聚福州，利用闽江和建筑打造绚丽灯光艺术作品</p>
                <el-button type="info" plain size="small">了解详情</el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card class="event-card" shadow="hover">
              <img src="https://source.unsplash.com/500x300/?music,concert,outdoor" alt="江滨音乐节">
              <div class="card-content">
                <div class="event-date">每年7月-8月</div>
                <h3>闽江滨水音乐节</h3>
                <p>在江滨公园举办的露天音乐会，伴随着闽江夜景聆听动人旋律</p>
                <el-button type="info" plain size="small">了解详情</el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card class="event-card" shadow="hover">
              <img src="https://source.unsplash.com/500x300/?photography,exhibition" alt="摄影展">
              <div class="card-content">
                <div class="event-date">常年展出</div>
                <h3>闽江印象摄影展</h3>
                <p>展示福州市民和摄影师拍摄的闽江风貌摄影作品，记录城市变迁</p>
                <el-button type="info" plain size="small">了解详情</el-button>
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
import { Ship, Picture, Sunrise, Goblet, Location, PictureFilled, Ticket } from '@element-plus/icons-vue';
import FuzhouPageBackground from '@/components/FuzhouPageBackground.vue';
import FuzhouWaveDivider from '@/components/FuzhouWaveDivider.vue';
import FuzhouImageHover from '@/components/FuzhouImageHover.vue';

const additionalImages = [
  'https://source.unsplash.com/500x300/?river,night,lights',
  'https://source.unsplash.com/500x300/?city,water,bridge,night', 
  'https://source.unsplash.com/500x300/?river,cityscape,night'
];

const viewpoints = [
  {
    name: '闽江大桥观景平台',
    image: 'https://source.unsplash.com/500x300/?bridge,night,view',
    rating: 4.8,
    description: '位于闽江大桥北侧，可俯瞰整个闽江夜景，是拍摄桥梁灯光秀的最佳位置。',
    location: '鼓楼区闽江大桥北侧',
    bestTime: '晚上7点-10点'
  },
  {
    name: '江滨公园观景台',
    image: 'https://source.unsplash.com/500x300/?park,river,night',
    rating: 4.6,
    description: '位于江滨公园内的高处观景台，可观赏闽江弯道和两岸灯光，视野极佳。',
    location: '台江区江滨路',
    bestTime: '晚上8点-9点'
  },
  {
    name: '乌山观景点',
    image: 'https://source.unsplash.com/500x300/?hill,city,view,night',
    rating: 4.5,
    description: '从乌山顶俯瞰闽江夜景，可以一览福州城区全景和蜿蜒的闽江。',
    location: '鼓楼区乌山风景区',
    bestTime: '晚上7点-10点'
  },
  {
    name: '中洲岛观景点',
    image: 'https://source.unsplash.com/500x300/?island,river,night',
    rating: 4.4,
    description: '位于闽江中央的小岛，可以360度环视闽江夜景，是摄影师的最爱。',
    location: '台江区中洲岛',
    bestTime: '晚上8点-9点30分'
  },
  {
    name: '金鱼缸音乐喷泉',
    image: 'https://source.unsplash.com/500x300/?fountain,light,show',
    rating: 4.7,
    description: '闽江边的音乐喷泉，每晚有灯光秀表演，与对岸的建筑灯光相互辉映。',
    location: '台江区五一广场附近',
    bestTime: '晚上8点-9点30分（整点有表演）'
  },
  {
    name: 'E酒吧观景露台',
    image: 'https://source.unsplash.com/500x300/?bar,terrace,view,night',
    rating: 4.3,
    description: '位于高层建筑的露台酒吧，可以边品酒边欣赏闽江夜景的绝佳地点。',
    location: '仓山区闽江南岸高层建筑',
    bestTime: '晚上9点-凌晨'
  }
];
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

$fuzhou-sea: #3a8bc9; // 闽江蓝色

.highlight-detail {
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto;
  
  .page-header {
    text-align: center;
    margin-bottom: 40px;
    
    h1 {
      font-size: 2.8rem;
      color: $fuzhou-sea;
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
      border-bottom: 1px solid rgba($fuzhou-sea, 0.1);
      
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
          background-color: $fuzhou-sea;
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
        
        &.sea-icon {
          background-color: rgba($fuzhou-sea, 0.1);
          
          .el-icon {
            color: $fuzhou-sea;
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
  
  .cruise-section {
    .cruise-content {
      display: flex;
      gap: 30px;
      
      @media (max-width: $breakpoint-md) {
        flex-direction: column;
      }
      
      .cruise-image {
        flex: 1;
        min-width: 0;
        
        img {
          width: 100%;
          height: 100%;
          max-height: 350px;
          object-fit: cover;
          border-radius: 8px;
        }
      }
      
      .cruise-info {
        flex: 1;
        min-width: 0;
        
        h3 {
          color: $fuzhou-sea;
          margin: 0 0 15px;
          font-size: 1.3rem;
        }
        
        p {
          margin: 0 0 20px;
          line-height: 1.7;
          color: $text-primary;
        }
        
        .cruise-details {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 20px;
          
          @media (max-width: $breakpoint-sm) {
            grid-template-columns: repeat(1, 1fr);
          }
          
          .detail-item {
            h4 {
              margin: 0 0 8px;
              font-size: 1rem;
              color: $fuzhou-sea;
            }
            
            p {
              margin: 0 0 5px;
              font-size: 0.95rem;
              color: $text-secondary;
            }
          }
        }
        
        .book-btn {
          padding: 12px 25px;
          font-size: 1.05rem;
          background-color: $fuzhou-sea;
          border-color: $fuzhou-sea;
          
          .el-icon {
            margin-right: 5px;
          }
          
          &:hover {
            background-color: darken($fuzhou-sea, 5%);
            border-color: darken($fuzhou-sea, 5%);
          }
        }
      }
    }
  }
  
  .viewpoints-section {
    .viewpoints-content {
      .viewpoint-item {
        display: flex;
        flex-direction: column;
        height: 100%;
        
        .viewpoint-image {
          width: 100%;
          height: 180px;
          overflow: hidden;
          border-radius: 8px;
          margin-bottom: 15px;
          
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
            
            &:hover {
              transform: scale(1.05);
            }
          }
        }
        
        .viewpoint-info {
          flex: 1;
          
          h3 {
            margin: 0 0 8px;
            font-size: 1.1rem;
            color: $text-primary;
          }
          
          .rating {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            
            span {
              margin-left: 8px;
              font-size: 0.9rem;
              color: $text-secondary;
            }
          }
          
          p {
            margin: 0 0 12px;
            color: $text-secondary;
            font-size: 0.95rem;
            line-height: 1.6;
          }
          
          .viewpoint-meta {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 10px;
            font-size: 0.9rem;
            color: $text-secondary;
            
            span {
              display: flex;
              align-items: center;
              
              .el-icon {
                margin-right: 5px;
                color: $fuzhou-sea;
              }
            }
          }
        }
      }
      
      .mb-4 {
        margin-bottom: 1rem;
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
      
      .tip-item {
        h3 {
          font-size: 1.1rem;
          margin: 0 0 8px;
          color: $fuzhou-sea;
        }
        
        p {
          margin: 0;
          color: $text-secondary;
          line-height: 1.6;
        }
      }
    }
  }
  
  .events-section {
    padding: 40px 20px;
    
    h2 {
      text-align: center;
      margin-bottom: 30px;
      font-family: 'ZCOOL QingKe HuangYou', sans-serif;
      color: $text-primary;
      font-size: 1.8rem;
    }
    
    .event-card {
      overflow: hidden;
      margin-bottom: 20px;
      transition: all 0.3s ease;
      height: 100%;
      
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
        position: relative;
        
        .event-date {
          position: absolute;
          top: -30px;
          right: 15px;
          background: rgba($fuzhou-sea, 0.8);
          color: white;
          padding: 5px 12px;
          font-size: 0.85rem;
          border-radius: 20px;
        }
        
        h3 {
          margin: 10px 0 8px;
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