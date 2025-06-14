<template>
  <FuzhouPageBackground type="food">
    <div class="highlight-detail">
      <!-- 页面标题区域 -->
      <div class="page-header">
        <h1>闽菜文化</h1>
        <div class="subtitle">中国八大菜系之一 | 福州饮食文化的精髓</div>
        <FuzhouWaveDivider position="bottom" color="food" />
      </div>
      
      <!-- 主要内容区域 -->
      <div class="content-container">
        <div class="gallery-section">
          <FuzhouImageHover 
            src="https://source.unsplash.com/1200x600/?chinese,food,seafood" 
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
              <h2>闽菜文化简介</h2>
            </div>
          </template>
          
          <p>闽菜是中国八大菜系之一，主要流行于福建省及周边地区，也是台湾许多传统菜式的源头。福州菜作为闽菜的重要分支，以其"香、味、形、色"的特点著称于世。闽菜历史悠久，形成于宋代，成熟于明清，至今已有1000多年历史。</p>
          
          <p>闽菜的主要特点是"调汤、做糊、制酱、讲究色香味形"，善于烹制海鲜，保持食材的原汁原味，注重刀工和火候，以及独特的调味技巧。福州人喜欢口味偏甜，善用红糖和各种香料，同时兼具咸鲜之味，讲究"香而不腻、味浓而不俗"。</p>
          
          <p>闽菜代表菜品众多，最负盛名的当属"佛跳墙"，又名"福寿全"，集鲍鱼、海参、鱼翅等山珍海味于一鼎，需经上百道工序精心烹制而成。此外，福州鱼丸、肉燕、海蛎煎、面线糊、芋泥等也是闽菜中的经典代表。</p>
        </el-card>
        
        <el-card class="features-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>美食亮点</h2>
            </div>
          </template>
          
          <div class="feature-items">
            <div class="feature-item">
              <div class="feature-icon food-icon">
                <el-icon><Bowl /></el-icon>
              </div>
              <div class="feature-content">
                <h3>佛跳墙</h3>
                <p>闽菜第一名菜，集高汤、酱油、米酒、盐等几十种配料精心烹制而成，清而不淡、浓而不腻，香气四溢，用料讲究。</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon food-icon">
                <el-icon><Food /></el-icon>
              </div>
              <div class="feature-content">
                <h3>福州鱼丸</h3>
                <p>福州传统名点，以鲜鱼肉和猪肥肉精工制成，外形圆润，色泽洁白，入口弹牙，鲜嫩爽滑，内藏馅料。</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon food-icon">
                <el-icon><KnifeFork /></el-icon>
              </div>
              <div class="feature-content">
                <h3>肉燕</h3>
                <p>福州小吃代表，用猪瘦肉和淀粉擀成薄如蝉翼的皮，包裹馅料制成，汤清见底，皮薄透亮，味道鲜美。</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon food-icon">
                <el-icon><Dish /></el-icon>
              </div>
              <div class="feature-content">
                <h3>荔枝肉</h3>
                <p>传统闽菜，选用五花肉切成荔枝形状，炸至金黄酥脆，色泽红亮，酸甜可口，肥而不腻，是招待贵客的佳肴。</p>
              </div>
            </div>
          </div>
        </el-card>
        
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="12" :lg="12">
            <el-card class="culinary-techniques glass-card">
              <template #header>
                <div class="card-header">
                  <h2>烹饪技艺</h2>
                </div>
              </template>
              
              <div class="technique-list">
                <div class="technique-item">
                  <h3>精湛刀工</h3>
                  <p>闽菜讲究细致的刀工技艺，善用"推、切、剁、斩、片、丝、块"等多种刀法，根据食材特点采取不同切法。</p>
                </div>
                
                <div class="technique-item">
                  <h3>讲究火候</h3>
                  <p>闽菜火候讲究"文火慢炖"，特别是煨、焖、炖等烹调方法的运用，让食材充分入味又保持质地完整。</p>
                </div>
                
                <div class="technique-item">
                  <h3>独特调味</h3>
                  <p>善用沙茶酱、红糟、陈醋等特色调料，讲究酸甜适口、咸鲜适度，注重原汁原味的同时突显调味精妙。</p>
                </div>
                
                <div class="technique-item">
                  <h3>海鲜烹饪</h3>
                  <p>闽菜尤其擅长烹制各种海鲜，独创"调汁、勾芡、急火快炒"等烹饪方法，保持海鲜原有的鲜嫩口感。</p>
                </div>
              </div>
            </el-card>
          </el-col>
          
          <el-col :xs="24" :sm="24" :md="12" :lg="12">
            <el-card class="culinary-culture glass-card">
              <template #header>
                <div class="card-header">
                  <h2>饮食文化</h2>
                </div>
              </template>
              
              <div class="culture-content">
                <p>福州饮食文化深厚，素有"食在中国，味在福州"的美誉。福州人重视"食材鲜活、原汁原味"的饮食理念，追求食物的自然本味，讲究食材的新鲜度和品质。</p>
                
                <p>福州人饮食讲究"三茶六饭"，即早、中、晚各一杯茶，早、午、晚各两顿饭。"早茶"文化盛行，品茶吃点心是福州人重要的社交活动，茶楼文化历史悠久。</p>
                
                <p>福州菜讲究"家常菜精致化"，即使是普通家常菜也注重色香味形的完美统一，体现了福州人对生活品质的追求和对饮食艺术的尊重。</p>
                
                <div class="culture-quote">
                  <i>"民以食为天，食以鲜为先"</i>
                  <span>—— 福州饮食谚语</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        
        <!-- 品尝地图 -->
        <el-card class="food-map-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>福州美食地图</h2>
            </div>
          </template>
          
          <div class="food-map-content">
            <div class="map-intro">
              <p>福州各区域都有其特色美食聚集地，以下是几个值得一去的美食打卡点：</p>
            </div>
            
            <div class="map-spots">
              <el-timeline>
                <el-timeline-item
                  timestamp="老福州传统小吃"
                  placement="top"
                  :icon="MapLocation"
                  type="primary"
                >
                  <el-card class="map-card">
                    <h3>三坊七巷美食街</h3>
                    <p>汇集了各类传统福州小吃，如肉燕、鱼丸、芋泥等，还有老字号茶楼。</p>
                    <div class="location-info">
                      <span><el-icon><Location /></el-icon> 鼓楼区南后街</span>
                      <span><el-icon><Clock /></el-icon> 9:00-21:00</span>
                    </div>
                  </el-card>
                </el-timeline-item>
                
                <el-timeline-item
                  timestamp="海鲜美食天堂"
                  placement="top"
                  :icon="MapLocation"
                  type="success"
                >
                  <el-card class="map-card">
                    <h3>台江海鲜一条街</h3>
                    <p>各式新鲜海鲜烹饪，特色菜品如醉蟹、葱油蒸鱼、沙茶炒蛏子等应有尽有。</p>
                    <div class="location-info">
                      <span><el-icon><Location /></el-icon> 台江区上下杭一带</span>
                      <span><el-icon><Clock /></el-icon> 10:00-22:00</span>
                    </div>
                  </el-card>
                </el-timeline-item>
                
                <el-timeline-item
                  timestamp="地道佛跳墙"
                  placement="top"
                  :icon="MapLocation"
                  type="warning"
                >
                  <el-card class="map-card">
                    <h3>聚春园酒楼</h3>
                    <p>创始于清朝的百年老店，佛跳墙发源地，福州菜代表性餐厅。</p>
                    <div class="location-info">
                      <span><el-icon><Location /></el-icon> 鼓楼区南街</span>
                      <span><el-icon><Clock /></el-icon> 11:00-21:00</span>
                    </div>
                  </el-card>
                </el-timeline-item>
                
                <el-timeline-item
                  timestamp="现代美食汇集地"
                  placement="top"
                  :icon="MapLocation"
                  type="danger"
                >
                  <el-card class="map-card">
                    <h3>五一广场美食城</h3>
                    <p>融合传统与现代的美食天地，众多福州特色小吃与创新菜品并存。</p>
                    <div class="location-info">
                      <span><el-icon><Location /></el-icon> 鼓楼区五一广场</span>
                      <span><el-icon><Clock /></el-icon> 10:00-22:00</span>
                    </div>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </el-card>
      </div>
      
      <FuzhouWaveDivider position="bottom" color="brick" />
      
      <!-- 美食体验推荐 -->
      <div class="food-experience">
        <h2>美食体验推荐</h2>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card class="experience-card" shadow="hover">
              <img src="https://source.unsplash.com/500x300/?cooking,class" alt="厨艺体验">
              <div class="card-content">
                <h3>闽菜制作体验</h3>
                <p>在专业厨师指导下学习制作福州经典美食</p>
                <div class="card-tags">
                  <el-tag size="small" effect="light" type="warning">亲子互动</el-tag>
                  <el-tag size="small" effect="light" type="danger">技能学习</el-tag>
                </div>
                <el-button type="danger" plain size="small">查看详情</el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card class="experience-card" shadow="hover">
              <img src="https://source.unsplash.com/500x300/?food,tour" alt="美食之旅">
              <div class="card-content">
                <h3>福州美食一日游</h3>
                <p>专业导游带领探索福州隐藏的美食街巷</p>
                <div class="card-tags">
                  <el-tag size="small" effect="light" type="primary">深度体验</el-tag>
                  <el-tag size="small" effect="light" type="success">当地向导</el-tag>
                </div>
                <el-button type="danger" plain size="small">查看详情</el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card class="experience-card" shadow="hover">
              <img src="https://source.unsplash.com/500x300/?tea,ceremony" alt="茶艺体验">
              <div class="card-content">
                <h3>福州茶文化体验</h3>
                <p>品尝茉莉花茶，了解福州传统茶艺文化</p>
                <div class="card-tags">
                  <el-tag size="small" effect="light" type="info">文化体验</el-tag>
                  <el-tag size="small" effect="light" type="warning">品茗休闲</el-tag>
                </div>
                <el-button type="danger" plain size="small">查看详情</el-button>
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
import { Bowl, Food, KnifeFork, Dish, Location, Clock, MapLocation } from '@element-plus/icons-vue';
import FuzhouPageBackground from '@/components/FuzhouPageBackground.vue';
import FuzhouWaveDivider from '@/components/FuzhouWaveDivider.vue';
import FuzhouImageHover from '@/components/FuzhouImageHover.vue';

const additionalImages = [
  'https://source.unsplash.com/500x300/?chinese,dumplings',
  'https://source.unsplash.com/500x300/?chinese,noodles', 
  'https://source.unsplash.com/500x300/?seafood,cuisine'
];
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

$fuzhou-food: #d39670; // 福州软木画色，用作食物主题色

.highlight-detail {
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto;
  
  .page-header {
    text-align: center;
    margin-bottom: 40px;
    
    h1 {
      font-size: 2.8rem;
      color: $fuzhou-food;
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
      border-bottom: 1px solid rgba($fuzhou-food, 0.1);
      
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
          background-color: $fuzhou-food;
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
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        
        &.food-icon {
          background-color: rgba($fuzhou-food, 0.1);
          
          .el-icon {
            color: $fuzhou-food;
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
  
  .culinary-techniques,
  .culinary-culture {
    height: 100%;
    
    .technique-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
      
      .technique-item {
        h3 {
          font-size: 1.1rem;
          margin: 0 0 8px;
          color: $fuzhou-food;
        }
        
        p {
          margin: 0;
          color: $text-secondary;
          line-height: 1.6;
        }
      }
    }
    
    .culture-content {
      p {
        margin: 0 0 15px;
        line-height: 1.8;
        text-align: justify;
        color: $text-primary;
      }
      
      .culture-quote {
        margin-top: 20px;
        padding: 15px;
        background: rgba($fuzhou-food, 0.05);
        border-left: 4px solid $fuzhou-food;
        font-style: italic;
        
        i {
          display: block;
          font-size: 1.1rem;
          margin-bottom: 8px;
          color: $text-primary;
        }
        
        span {
          color: $text-secondary;
          font-size: 0.9rem;
        }
      }
    }
  }
  
  .food-map-section {
    .map-intro {
      margin-bottom: 20px;
      
      p {
        font-size: 1.05rem;
        color: $text-primary;
      }
    }
    
    .map-spots {
      .map-card {
        margin-bottom: 15px;
        
        h3 {
          margin: 0 0 10px;
          font-size: 1.1rem;
          color: $text-primary;
        }
        
        p {
          margin: 0 0 12px;
          color: $text-secondary;
        }
        
        .location-info {
          display: flex;
          gap: 15px;
          color: $text-secondary;
          font-size: 0.9rem;
          
          span {
            display: flex;
            align-items: center;
            
            .el-icon {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
  
  .food-experience {
    padding: 40px 20px;
    
    h2 {
      text-align: center;
      margin-bottom: 30px;
      font-family: 'ZCOOL QingKe HuangYou', sans-serif;
      color: $text-primary;
      font-size: 1.8rem;
    }
    
    .experience-card {
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
        
        .card-tags {
          margin-bottom: 12px;
          
          .el-tag {
            margin-right: 5px;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
}
</style> 