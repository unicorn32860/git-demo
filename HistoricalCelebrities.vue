<template>
  <FuzhouPageBackground type="culture">
    <div class="highlight-detail">
      <!-- 页面标题区域 -->
      <div class="page-header">
        <h1>历史名人故居</h1>
        <div class="subtitle">文献名邦 | 千年榕城人文荟萃</div>
        <FuzhouWaveDivider position="bottom" color="culture" />
      </div>
      
      <!-- 主要内容区域 -->
      <div class="content-container">
        <div class="gallery-section">
          <FuzhouImageHover 
            src="@/assets/images/linjuemin.jpg" 
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
              <h2>名人故居简介</h2>
            </div>
          </template>
          
          <p>福州自古以来人才辈出，素有"海滨邹鲁"、"文献名邦"之称，孕育了众多对中国历史和世界文明进步有重要影响的历史人物。这些杰出人物的故居散布于福州城区各处，特别是在三坊七巷历史文化街区内，形成了独特的名人文化景观带。</p>
          
          <p>福州历史名人故居不仅是重要的文物保护单位，更是了解福州历史文化和名人生平的重要窗口。这些故居大多保留了传统闽派建筑风格，具有重要的历史、文化和艺术价值。通过参观这些名人故居，可以追溯名人成长足迹，感受他们的精神世界，了解他们对中华文明的贡献。</p>
          
          <p>目前福州市区内保存完好且对外开放的名人故居主要有林则徐纪念馆、严复故居、林觉民故居、冰心纪念馆、于山名人馆等。这些故居通过实物展示、文献资料、多媒体展陈等多种方式，全面展示了这些历史名人的生平事迹和历史贡献。</p>
        </el-card>
        
        <el-card class="features-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>主要名人故居</h2>
            </div>
          </template>
          
          <div class="feature-items">
            <div class="feature-item">
              <div class="feature-icon culture-icon">
                <el-icon><List /></el-icon>
              </div>
              <div class="feature-content">
                <h3>林则徐纪念馆</h3>
                <p>位于南后街上的林则徐纪念馆，是为纪念清代杰出的民族英雄、思想家林则徐而建，通过大量文物资料展示了林则徐的生平事迹及其在禁毒、边疆治理等方面的杰出贡献。</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon culture-icon">
                <el-icon><Reading /></el-icon>
              </div>
              <div class="feature-content">
                <h3>严复故居</h3>
                <p>位于光禄坊的严复故居，是中国近代著名思想家、翻译家严复的住所。故居内保留了许多严复使用过的物品，并展示了他翻译的《天演论》等重要著作，反映了他传播西方思想、推动中国近代化的探索历程。</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon culture-icon">
                <el-icon><Message /></el-icon>
              </div>
              <div class="feature-content">
                <h3>林觉民故居</h3>
                <p>三坊七巷内的林觉民故居，是辛亥革命烈士林觉民的出生和生活地。故居保留了原有的建筑风格，展出了林觉民的生平事迹、家书《与妻书》等珍贵文物，展现了他短暂而光辉的一生。</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon culture-icon">
                <el-icon><Edit /></el-icon>
              </div>
              <div class="feature-content">
                <h3>冰心纪念馆</h3>
                <p>位于杨桥巷的冰心纪念馆是著名作家冰心的故居，馆内展示了冰心的生平事迹、文学成就及其使用过的物品，反映了她"爱与美"的文学思想和人道主义精神。</p>
              </div>
            </div>
          </div>
        </el-card>
        
        <!-- 名人图谱 -->
        <el-card class="celebrities-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>福州历史名人图谱</h2>
            </div>
          </template>
          
          <div class="celebrities-content">
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-period">古代</div>
                <div class="timeline-figures">
                  <div class="figure-item">
                    <img src="https://source.unsplash.com/300x300/?ancient,chinese,scholar" alt="王审知">
                    <h3>王审知</h3>
                    <p>唐末五代时期闽国开国君主，在位期间开拓经济，敦请名儒，建造三山书院，推动福州文化发展。</p>
                  </div>
                  <div class="figure-item">
                    <img src="https://source.unsplash.com/300x300/?ancient,chinese,poet" alt="郑思肖">
                    <h3>郑思肖</h3>
                    <p>南宋末年著名画家、诗人，被称为"宋末四大遗民"之一，创作了《墨兰图》等名作。</p>
                  </div>
                </div>
              </div>
              
              <div class="timeline-item">
                <div class="timeline-period">明清</div>
                <div class="timeline-figures">
                  <div class="figure-item">
                    <img src="https://source.unsplash.com/300x300/?qing,dynasty,official" alt="林则徐">
                    <h3>林则徐</h3>
                    <p>清代著名政治家、思想家，禁烟运动的领导者，被誉为"民族英雄"，提出"睁开眼睛看世界"的主张。</p>
                  </div>
                  <div class="figure-item">
                    <img src="https://source.unsplash.com/300x300/?qing,dynasty,navy" alt="沈葆桢">
                    <h3>沈葆桢</h3>
                    <p>清代福州船政学堂创办者，中国近代海军的奠基人，为中国近代工业和教育发展作出重要贡献。</p>
                  </div>
                </div>
              </div>
              
              <div class="timeline-item">
                <div class="timeline-period">近现代</div>
                <div class="timeline-figures">
                  <div class="figure-item">
                    <img src="@/assets/images/yanfu.jpg" alt="严复">
                    <h3>严复</h3>
                    <p>近代思想启蒙者、翻译家，引入西方思想，翻译《天演论》《法意》等著作，对中国近代化产生深远影响。</p>
                  </div>
                  <div class="figure-item">
                    <img src="@/assets/images/linjuemin.jpg" alt="林觉民">
                    <h3>林觉民</h3>
                    <p>辛亥革命烈士，福建光复运动领导者，著《与妻书》表达对妻子和革命的深情，感人至深。</p>
                  </div>
                  <div class="figure-item">
                    <img src="https://source.unsplash.com/300x300/?writer,chinese,female" alt="冰心">
                    <h3>冰心</h3>
                    <p>现代著名女作家、翻译家、儿童文学家，作品体现"爱的哲学"，对中国现代文学产生重要影响。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
        
        <!-- 参观路线 -->
        <el-card class="route-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>名人故居一日游</h2>
            </div>
          </template>
          
          <div class="route-content">
            <div class="route-map">
              <img src="https://source.unsplash.com/1000x600/?map,route,ancient,city" alt="名人故居路线图">
              <div class="map-legend">
                <div class="legend-item">
                  <div class="legend-color start"></div>
                  <span>起点：三坊七巷牌坊</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color point"></div>
                  <span>名人故居</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color route"></div>
                  <span>推荐路线</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color end"></div>
                  <span>终点：于山名人馆</span>
                </div>
              </div>
            </div>
            
            <div class="route-steps">
              <h3>推荐路线</h3>
              <el-steps direction="vertical" :active="5">
                <el-step title="三坊七巷牌坊" description="路线起点，了解三坊七巷历史概况">
                  <template #icon>
                    <el-icon><Position /></el-icon>
                  </template>
                </el-step>
                <el-step title="林觉民故居" description="位于杨桥巷，距离起点约300米，游览时间约40分钟">
                  <template #icon>
                    <el-icon><House /></el-icon>
                  </template>
                </el-step>
                <el-step title="严复故居" description="位于光禄坊，距林觉民故居约500米，游览时间约30分钟">
                  <template #icon>
                    <el-icon><House /></el-icon>
                  </template>
                </el-step>
                <el-step title="林则徐纪念馆" description="位于南后街，游览时间约60分钟，可在此休息用午餐">
                  <template #icon>
                    <el-icon><School /></el-icon>
                  </template>
                </el-step>
                <el-step title="冰心纪念馆" description="位于杨桥巷，游览时间约40分钟">
                  <template #icon>
                    <el-icon><House /></el-icon>
                  </template>
                </el-step>
                <el-step title="于山名人馆" description="路线终点，综合了解福州历史名人事迹，游览时间约90分钟">
                  <template #icon>
                    <el-icon><Flag /></el-icon>
                  </template>
                </el-step>
              </el-steps>
              
              <div class="route-tips">
                <h4>游览贴士</h4>
                <ul>
                  <li>总路程约2公里，全程步行约需4-5小时</li>
                  <li>建议上午9点出发，下午5点前结束</li>
                  <li>部分故居和纪念馆周一闭馆，请提前查询</li>
                  <li>游览期间可在三坊七巷内的茶馆稍作休息</li>
                </ul>
              </div>
            </div>
          </div>
        </el-card>
        
        <!-- 文化活动 -->
        <el-card class="activities-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>相关文化活动</h2>
            </div>
          </template>
          
          <div class="activities-content">
            <el-table :data="activities" style="width: 100%">
              <el-table-column prop="name" label="活动名称" min-width="180" />
              <el-table-column prop="location" label="举办地点" min-width="150" />
              <el-table-column prop="time" label="活动时间" min-width="150" />
              <el-table-column prop="description" label="活动简介" min-width="300" />
              <el-table-column label="操作" width="120" fixed="right">
                <template #default="scope">
                  <el-button link type="primary" size="small" @click="viewActivity(scope.row)">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>
      
      <FuzhouWaveDivider position="bottom" color="brick" />
      
      <!-- 文化体验 -->
      <div class="cultural-experience">
        <h2>文化体验推荐</h2>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card class="experience-card" shadow="hover">
              <img src="https://source.unsplash.com/500x300/?calligraphy,chinese" alt="书法体验">
              <div class="card-content">
                <h3>名人墨迹临摹体验</h3>
                <p>在专业老师指导下临摹林则徐、严复等名人墨宝，感受传统书法艺术魅力</p>
                <div class="card-tags">
                  <el-tag size="small" effect="light" type="info">文化体验</el-tag>
                  <el-tag size="small" effect="light" type="warning">技能学习</el-tag>
                </div>
                <el-button type="warning" plain size="small" @click="router.push('/guide?tag=文化体验&activity=书法临摹')">查看详情</el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card class="experience-card" shadow="hover">
              <img src="https://source.unsplash.com/500x300/?tour,guide,museum" alt="导览体验">
              <div class="card-content">
                <h3>名人故事主题导览</h3>
                <p>资深文化导游带您探索福州名人背后的感人故事，深入了解历史</p>
                <div class="card-tags">
                  <el-tag size="small" effect="light" type="primary">深度体验</el-tag>
                  <el-tag size="small" effect="light" type="success">专业讲解</el-tag>
                </div>
                <el-button type="warning" plain size="small" @click="router.push('/guide?tag=文化导览&activity=名人故事')">查看详情</el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card class="experience-card" shadow="hover">
              <img src="https://source.unsplash.com/500x300/?photography,historical,building" alt="摄影体验">
              <div class="card-content">
                <h3>名人故居摄影之旅</h3>
                <p>在专业摄影师指导下捕捉古建筑和文物的最佳角度，创作艺术作品</p>
                <div class="card-tags">
                  <el-tag size="small" effect="light" type="danger">创意活动</el-tag>
                  <el-tag size="small" effect="light" type="info">艺术体验</el-tag>
                </div>
                <el-button type="warning" plain size="small" @click="router.push('/guide?tag=创意活动&activity=摄影体验')">查看详情</el-button>
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
import { List, Reading, Message, Edit, Position, House, School, Flag } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import FuzhouPageBackground from '@/components/FuzhouPageBackground.vue';
import FuzhouWaveDivider from '@/components/FuzhouWaveDivider.vue';
import FuzhouImageHover from '@/components/FuzhouImageHover.vue';

const router = useRouter();

// 查看活动详情
const viewActivity = (activity) => {
  router.push({
    path: '/guide',
    query: { 
      activity: activity.name,
      location: activity.location
    }
  });
};

const additionalImages = [
  '@/assets/images/yanfu.jpg',
  'https://source.unsplash.com/500x300/?chinese,historical,house', 
  'https://source.unsplash.com/500x300/?museum,exhibition,chinese'
];

const activities = [
  {
    name: '林则徐与鸦片战争史料展',
    location: '林则徐纪念馆',
    time: '2023年6月1日 - 12月31日',
    description: '展出大量珍贵历史文物和图片资料，全面展示林则徐领导禁烟运动的历史'
  },
  {
    name: '"严译名著"专题讲座',
    location: '严复故居多功能厅',
    time: '每周六 14:00-16:00',
    description: '邀请语言学专家解读严复翻译著作的特点和历史意义，带领读者深入了解'
  },
  {
    name: '林觉民《与妻书》朗诵会',
    location: '林觉民故居前院',
    time: '每月第一个周日 19:30',
    description: '邀请专业演员朗诵这封感人肺腑的诀别书，再现革命先烈的家国情怀'
  },
  {
    name: '冰心儿童文学创作工作坊',
    location: '冰心纪念馆',
    time: '每周日 9:30-11:30',
    description: '面向6-12岁儿童的创意写作活动，培养儿童文学创作兴趣和能力'
  },
  {
    name: '福州历史名人图片展',
    location: '于山名人馆',
    time: '常年展出',
    description: '通过大量历史照片和文献资料，全面展示福州历史名人的生平和贡献'
  }
];

</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

$fuzhou-culture: #8a1c1c; // 脱胎漆器红色，用作文化主题色
$fuzhou-brick: #e86231; // 三坊七巷砖红色

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
      color: $fuzhou-culture;
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
      border-bottom: 1px solid rgba($fuzhou-culture, 0.1);
      
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
          background-color: $fuzhou-culture;
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
        
        &.culture-icon {
          background-color: rgba($fuzhou-culture, 0.1);
          
          .el-icon {
            color: $fuzhou-culture;
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
  
  .celebrities-section {
    .celebrities-content {
      .timeline {
        display: flex;
        flex-direction: column;
        gap: 40px;
        
        .timeline-item {
          .timeline-period {
            font-size: 1.4rem;
            font-weight: bold;
            color: $fuzhou-culture;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba($fuzhou-culture, 0.2);
          }
          
          .timeline-figures {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
            
            .figure-item {
              text-align: center;
              
              img {
                width: 120px;
                height: 120px;
                border-radius: 60px;
                object-fit: cover;
                margin-bottom: 15px;
                border: 4px solid rgba($fuzhou-culture, 0.2);
              }
              
              h3 {
                margin: 0 0 8px;
                font-size: 1.2rem;
                color: $text-primary;
              }
              
              p {
                margin: 0;
                color: $text-secondary;
                font-size: 0.95rem;
                line-height: 1.6;
                text-align: left;
              }
            }
          }
        }
      }
    }
  }
  
  .route-section {
    .route-content {
      display: flex;
      gap: 30px;
      
      @media (max-width: $breakpoint-md) {
        flex-direction: column;
      }
      
      .route-map {
        flex: 1;
        position: relative;
        
        img {
          width: 100%;
          height: 100%;
          max-height: 400px;
          object-fit: cover;
          border-radius: 8px;
        }
        
        .map-legend {
          position: absolute;
          bottom: 15px;
          right: 15px;
          background: rgba(255, 255, 255, 0.9);
          padding: 10px 15px;
          border-radius: 8px;
          
          .legend-item {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
            
            &:last-child {
              margin-bottom: 0;
            }
            
            .legend-color {
              width: 15px;
              height: 15px;
              border-radius: 50%;
              margin-right: 8px;
              
              &.start {
                background-color: #409EFF;
              }
              
              &.point {
                background-color: $fuzhou-culture;
              }
              
              &.route {
                background-color: $fuzhou-brick;
              }
              
              &.end {
                background-color: #67C23A;
              }
            }
            
            span {
              font-size: 0.85rem;
              color: $text-primary;
            }
          }
        }
      }
      
      .route-steps {
        flex: 1;
        
        h3 {
          margin: 0 0 15px;
          font-size: 1.2rem;
          color: $fuzhou-culture;
        }
        
        .route-tips {
          margin-top: 20px;
          background: rgba($fuzhou-culture, 0.05);
          border-radius: 8px;
          padding: 15px;
          
          h4 {
            margin: 0 0 10px;
            color: $fuzhou-culture;
          }
          
          ul {
            margin: 0;
            padding-left: 20px;
            
            li {
              color: $text-secondary;
              margin-bottom: 5px;
              font-size: 0.95rem;
              
              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
  
  .activities-section {
    .activities-content {
      overflow-x: auto;
    }
  }
  
  .cultural-experience {
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