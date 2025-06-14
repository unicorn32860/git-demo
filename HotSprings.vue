<template>
  <FuzhouPageBackground type="nature">
    <div class="highlight-detail">
      <!-- 页面标题区域 -->
      <div class="page-header">
        <h1>温泉资源</h1>
        <div class="subtitle">自然馈赠 | 千年福州的健康养生圣地</div>
        <FuzhouWaveDivider position="bottom" color="nature" />
      </div>
      
      <!-- 主要内容区域 -->
      <div class="content-container">
        <div class="gallery-section">
          <FuzhouImageHover 
            src="@/assets/images/hotspring.jpg" 
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
              <h2>温泉资源简介</h2>
            </div>
          </template>
          
          <p>福州是中国著名的"温泉之城"，拥有丰富的温泉资源，主要分布在福州市区周边的温泉镇、青云山、鼓山等地区。这些温泉形成于数百万年前，由地下深层岩浆加热地下水形成，水质清澈，富含硫、钙、镁、锶等多种矿物质和微量元素，具有极高的医疗保健价值。</p>
          
          <p>福州温泉历史悠久，早在唐代就有关于泡温泉疗养的记载。宋代理学家朱熹曾在此沐浴疗养并留下诗篇，明清时期更是形成了成熟的温泉疗养文化。现如今，福州温泉已经成为城市重要的旅游资源和休闲胜地，每年吸引大量国内外游客前来享受泡汤乐趣。</p>
          
          <p>福州温泉不仅水质优良，而且环境优美，多数温泉景区都位于山清水秀的自然环境中，结合了闽派建筑特色和现代设施，提供了丰富的温泉体验方式。从传统的露天温泉池，到现代化的SPA项目，从日式温泉风情到欧式水疗体验，满足不同游客的需求。</p>
        </el-card>
        
        <el-card class="features-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>特色温泉推荐</h2>
            </div>
          </template>
          
          <div class="feature-items">
            <div class="feature-item">
              <div class="feature-icon nature-icon">
                <el-icon><Sunrise /></el-icon>
              </div>
              <div class="feature-content">
                <h3>青云山温泉</h3>
                <p>位于福州市永泰县境内的青云山温泉，是国家AAAA级旅游景区，以"山水温泉"著称。温泉水富含多种有益微量元素，共有40多个各具特色的温泉池，包括木桶池、石板池、汗蒸房等，泡汤之余还能欣赏青山绿水的自然风光。</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon nature-icon">
                <el-icon><SwitchButton /></el-icon>
              </div>
              <div class="feature-content">
                <h3>温泉镇古汤</h3>
                <p>福州市温泉镇古汤温泉历史悠久，是福州最为古老的温泉之一，距今已有1600多年历史，享有"天下第一温泉"的美誉。古汤温泉水温适中，水质清澈透明，富含多种微量元素，有"养生圣水"之称，是体验传统温泉文化的最佳去处。</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon nature-icon">
                <el-icon><MagicStick /></el-icon>
              </div>
              <div class="feature-content">
                <h3>鼓山温泉</h3>
                <p>位于福州市仓山区的鼓山温泉，依托鼓山风景名胜区而建，环境清幽，设计独特。温泉区内融合了闽南风情和日式风格，建有多种功能的温泉池，包括草药池、牛奶池、葡萄酒池等，并提供专业的SPA服务，是城市近郊休闲度假的理想选择。</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon nature-icon">
                <el-icon><Place /></el-icon>
              </div>
              <div class="feature-content">
                <h3>永泰御温泉</h3>
                <p>永泰御温泉是一处融合现代设计与自然风光的高端温泉度假区，温泉从地下1380米深处涌出，水温达68℃，富含锶、锂、锌等30多种微量元素。温泉区设置了多个风格各异的池区，包括动感泡池、静谧休闲区、儿童戏水区等，满足不同客人的需求。</p>
              </div>
            </div>
          </div>
        </el-card>
        
        <!-- 温泉功效 -->
        <el-card class="benefits-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>温泉养生功效</h2>
            </div>
          </template>
          
          <div class="benefits-content">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12" :md="8">
                <div class="benefit-item">
                  <div class="benefit-icon">
                    <el-icon><GoodsFilled /></el-icon>
                  </div>
                  <h3>改善血液循环</h3>
                  <p>温泉的热力可以扩张血管，促进血液循环，有助于缓解肌肉疲劳，改善手脚冰冷和低血压症状。</p>
                </div>
              </el-col>
              
              <el-col :xs="24" :sm="12" :md="8">
                <div class="benefit-item">
                  <div class="benefit-icon">
                    <el-icon><Star /></el-icon>
                  </div>
                  <h3>舒缓神经压力</h3>
                  <p>温热的泉水能够促进体内脑啡肽的分泌，帮助缓解精神压力，改善睡眠质量，减轻焦虑和抑郁情绪。</p>
                </div>
              </el-col>
              
              <el-col :xs="24" :sm="12" :md="8">
                <div class="benefit-item">
                  <div class="benefit-icon">
                    <el-icon><Notification /></el-icon>
                  </div>
                  <h3>缓解关节疼痛</h3>
                  <p>富含矿物质的温泉水对风湿性关节炎、腰椎间盘突出等疾病有一定的缓解作用，能减轻疼痛感。</p>
                </div>
              </el-col>
              
              <el-col :xs="24" :sm="12" :md="8">
                <div class="benefit-item">
                  <div class="benefit-icon">
                    <el-icon><Cherry /></el-icon>
                  </div>
                  <h3>美容养颜</h3>
                  <p>温泉水中的矿物质能够清洁和滋养皮肤，促进皮肤新陈代谢，有助于改善皮肤弹性和光泽。</p>
                </div>
              </el-col>
              
              <el-col :xs="24" :sm="12" :md="8">
                <div class="benefit-item">
                  <div class="benefit-icon">
                    <el-icon><MoonNight /></el-icon>
                  </div>
                  <h3>促进新陈代谢</h3>
                  <p>泡温泉可以促进体内的新陈代谢，加速体内毒素的排出，增强免疫力，有助于预防感冒等疾病。</p>
                </div>
              </el-col>
              
              <el-col :xs="24" :sm="12" :md="8">
                <div class="benefit-item">
                  <div class="benefit-icon">
                    <el-icon><Orange /></el-icon>
                  </div>
                  <h3>调节内分泌</h3>
                  <p>长期泡温泉能够调节人体内分泌系统，平衡荷尔蒙水平，对女性月经不调、更年期综合症有一定的改善作用。</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
        
        <!-- 温泉文化 -->
        <el-card class="culture-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>福州温泉文化</h2>
            </div>
          </template>
          
          <div class="culture-content">
            <div class="culture-image">
              <img src="https://source.unsplash.com/800x450/?hot,spring,ancient,chinese" alt="温泉文化历史">
            </div>
            
            <div class="culture-info">
              <div class="history-timeline">
                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <h3>唐代 (618-907)</h3>
                    <p>福州温泉最早的文字记载出现在唐代诗人的作品中，描述了福州士大夫泡温泉、赏美景的雅致生活。</p>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <h3>宋代 (960-1279)</h3>
                    <p>朱熹、杨时等著名理学家曾在福州温泉沐浴疗养，并留下诗词赞美温泉的自然治愈力，福州温泉文化正式形成。</p>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <h3>明清时期 (1368-1911)</h3>
                    <p>温泉成为文人雅士必访之地，形成了"泡温泉、品茶艺、作诗文"的独特温泉文化，并建立了多处温泉浴场。</p>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <h3>近现代</h3>
                    <p>随着医学的发展，福州温泉的医疗保健功效得到科学验证，开始走向现代化温泉度假区的发展模式。</p>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <h3>当代</h3>
                    <p>福州温泉产业蓬勃发展，融合了养生、休闲、旅游等多元功能，形成了"温泉+美食+住宿+文化"的全方位体验。</p>
                  </div>
                </div>
              </div>
              
              <div class="culture-quote">
                <i>"温泉一杯春露滑，茶香四季暖人心"</i>
                <span>—— 福州温泉古谚</span>
              </div>
            </div>
          </div>
        </el-card>
        
        <!-- 温泉攻略 -->
        <el-card class="guide-section glass-card">
          <template #header>
            <div class="card-header">
              <h2>温泉体验攻略</h2>
            </div>
          </template>
          
          <div class="guide-content">
            <el-tabs type="border-card">
              <el-tab-pane label="最佳时间">
                <div class="tab-content">
                  <h3>四季皆宜，冬季最佳</h3>
                  <p>福州温泉四季皆可泡，但最佳季节是每年的10月至次年3月。这段时间天气较凉爽，冷热反差适中，泡温泉的舒适度最高。尤其是下雨天或雪后，泡温泉的体验更佳。</p>
                  <h4>推荐时段</h4>
                  <ul>
                    <li>早晨6:00-9:00：空气清新，人少环境好</li>
                    <li>下午15:00-17:00：阳光不强烈，水温适中</li>
                    <li>晚上19:00后：可以体验夜泡温泉的浪漫氛围</li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="泡汤技巧">
                <div class="tab-content">
                  <h3>科学泡汤，享受健康</h3>
                  <ol>
                    <li>泡温泉前应充分冲洗身体，去除表面污垢</li>
                    <li>先浸泡脚部，让身体逐渐适应水温</li>
                    <li>每次泡温泉时间不宜过长，建议15-20分钟为宜</li>
                    <li>感到头晕或心跳加速时应立即离开温泉池</li>
                    <li>泡温泉期间补充足够的水分，防止脱水</li>
                    <li>不同功效的温泉池可以交替体验，但注意休息间隔</li>
                    <li>泡完温泉后，休息20-30分钟再离开，避免血压骤变</li>
                  </ol>
                </div>
              </el-tab-pane>
              <el-tab-pane label="注意事项">
                <div class="tab-content">
                  <h3>安全第一，理性享受</h3>
                  <p>以下人群泡温泉需谨慎或避免：</p>
                  <ul>
                    <li>患有心脏病、高血压、严重糖尿病的人群</li>
                    <li>皮肤有开放性伤口或严重皮肤病患者</li>
                    <li>妊娠期女性或经期女性</li>
                    <li>酒后或极度疲劳状态</li>
                    <li>年幼儿童需在成人陪同下入池</li>
                    <li>饭后1小时内不宜立即泡温泉</li>
                    <li>佩戴金属饰品可能导致烫伤，建议取下</li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="必备物品">
                <div class="tab-content">
                  <h3>温泉旅行小贴士</h3>
                  <div class="item-grid">
                    <div class="item-box">
                      <el-icon><Wallet /></el-icon>
                      <span>泳衣/泳裤</span>
                    </div>
                    <div class="item-box">
                      <el-icon><SuitcaseLine /></el-icon>
                      <span>毛巾/浴巾</span>
                    </div>
                    <div class="item-box">
                      <el-icon><IceCream /></el-icon>
                      <span>洗漱用品</span>
                    </div>
                    <div class="item-box">
                      <el-icon><CoffeeCup /></el-icon>
                      <span>饮用水</span>
                    </div>
                    <div class="item-box">
                      <el-icon><Basketball /></el-icon>
                      <span>泳帽</span>
                    </div>
                    <div class="item-box">
                      <el-icon><TakeawayBox /></el-icon>
                      <span>防水袋</span>
                    </div>
                    <div class="item-box">
                      <el-icon><Suitcase /></el-icon>
                      <span>拖鞋</span>
                    </div>
                    <div class="item-box">
                      <el-icon><ColdDrink /></el-icon>
                      <span>补水面膜</span>
                    </div>
                  </div>
                  <p class="tip-text">*大部分温泉度假区都提供基本用品，可提前咨询</p>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
      </div>
      
      <FuzhouWaveDivider position="bottom" color="food" />
      
      <!-- 热门套餐 -->
      <div class="packages-section">
        <h2>热门温泉套餐</h2>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" :lg="8" v-for="(pkg, index) in packages" :key="index">
            <el-card class="package-card" shadow="hover">
              <img :src="pkg.image" :alt="pkg.name">
              <div class="package-price">
                <span class="amount">{{ pkg.price }}</span>
                <span class="unit">元起/人</span>
              </div>
              <div class="card-content">
                <h3>{{ pkg.name }}</h3>
                <p>{{ pkg.description }}</p>
                <div class="package-features">
                  <div class="feature" v-for="(feature, i) in pkg.features" :key="i">
                    <el-icon><Check /></el-icon>
                    <span>{{ feature }}</span>
                  </div>
                </div>
                <el-button type="success" plain size="large" class="book-btn" @click="bookPackage(pkg)">立即预订</el-button>
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
import { Sunrise, SwitchButton, MagicStick, Place, GoodsFilled, Star, Notification, Cherry, MoonNight, Orange, Flag, View, Mug, PriceTag, Check } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import FuzhouPageBackground from '@/components/FuzhouPageBackground.vue';
import FuzhouWaveDivider from '@/components/FuzhouWaveDivider.vue';
import FuzhouImageHover from '@/components/FuzhouImageHover.vue';

const router = useRouter();

const bookPackage = (pkg) => {
  // 可以将套餐信息传递到预订页面
  router.push({
    path: '/order/confirm',
    query: { 
      type: 'hotspring',
      package: pkg.name,
      price: pkg.price
    }
  });
};

const additionalImages = [
  'https://source.unsplash.com/500x300/?hot,spring,pool',
  'https://source.unsplash.com/500x300/?spa,relax', 
  'https://source.unsplash.com/500x300/?steam,sauna'
];

const hotSpringTypes = [
  { 
    name: '自然温泉', 
    rating: 5,
    description: '完全自然形成的温泉，无人工干预，水质纯净，环境自然。多位于深山地区，需要徒步才能抵达。',
    icon: 'Sunrise'
  },
  { 
    name: '度假酒店温泉', 
    rating: 4.5,
    description: '结合高端住宿和温泉体验，通常有室内外多种温泉池，配套设施齐全，提供一站式度假体验。',
    icon: 'SwitchButton'
  },
  { 
    name: '主题温泉', 
    rating: 4,
    description: '根据不同主题设计的温泉区，如森林温泉、洞穴温泉、日式温泉等，注重创造独特的泡汤氛围。',
    icon: 'MagicStick'
  },
  { 
    name: '民俗温泉', 
    rating: 4,
    description: '融合当地民俗文化和温泉体验，通常由当地居民经营，能体验到原汁原味的闽东文化。',
    icon: 'Place'
  }
];

const seasonalRecommendations = [
  {
    season: '春季',
    title: '青云山温泉',
    description: '春季山花烂漫，是欣赏青云山风光的最佳时节，温泉与花海相得益彰。',
    tags: ['赏花', '踏青', '温泉']
  },
  {
    season: '夏季',
    title: '鼓山冷泉',
    description: '夏季炎热，鼓山冷泉水温常年保持在18℃左右，是消暑的绝佳去处。',
    tags: ['避暑', '清凉', '山景']
  },
  {
    season: '秋季',
    title: '永泰温泉',
    description: '秋高气爽，是温泉养生的黄金季节，泡汤后漫步于红叶林间，别有一番情趣。',
    tags: ['红叶', '养生', '静谧']
  },
  {
    season: '冬季',
    title: '汤岭温泉',
    description: '寒冬时节，汤岭温泉的硫磺温泉有极好的保暖效果，冬季泡温泉更能体会"冰火两重天"的奇妙感受。',
    tags: ['驱寒', '养生', '温暖']
  }
];

const packages = [
  {
    name: '青云山温泉养生一日游',
    image: 'https://source.unsplash.com/500x300/?mountains,hot,spring',
    price: '268',
    description: '泡汤、品茗、赏景、尝美食，一次满足您的全部温泉体验',
    features: [
      '无限次温泉浸泡',
      '青云山景区门票',
      '特色农家午餐',
      '中式足底按摩30分钟'
    ]
  },
  {
    name: '温泉镇古汤文化体验',
    image: 'https://source.unsplash.com/500x300/?traditional,chinese,spring',
    price: '368',
    description: '传承千年的温泉文化，体验古法泡汤与养生智慧',
    features: [
      '古法温泉浸泡',
      '茶艺表演与品茗',
      '闽菜风味晚宴',
      '温泉历史讲解导览'
    ]
  },
  {
    name: '御温泉豪华SPA双人套',
    image: 'https://source.unsplash.com/500x300/?luxury,spa,couple',
    price: '598',
    description: '奢华私密的双人温泉体验，享受高端水疗服务',
    features: [
      '私人温泉池90分钟',
      '全身SPA按摩60分钟',
      '精美下午茶',
      '浪漫鲜花布置'
    ]
  }
];

</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

$fuzhou-nature: #7bae37; // 茉莉花茶绿色，用于自然景观主题色

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
  
  .benefits-section {
    .benefits-content {
      padding: 10px 0;
      
      .benefit-item {
        text-align: center;
        margin-bottom: 30px;
        padding: 0 15px;
        
        .benefit-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba($fuzhou-nature, 0.1) 0%, rgba($fuzhou-nature, 0.3) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          
          .el-icon {
            color: $fuzhou-nature;
            font-size: 30px;
          }
        }
        
        h3 {
          font-size: 1.1rem;
          color: $text-primary;
          margin: 0 0 10px;
        }
        
        p {
          color: $text-secondary;
          line-height: 1.6;
          margin: 0;
          font-size: 0.95rem;
        }
      }
    }
  }
  
  .culture-section {
    .culture-content {
      display: flex;
      gap: 30px;
      
      @media (max-width: $breakpoint-md) {
        flex-direction: column;
      }
      
      .culture-image {
        flex: 1;
        min-width: 0;
        
        img {
          width: 100%;
          height: auto;
          border-radius: 8px;
          object-fit: cover;
        }
      }
      
      .culture-info {
        flex: 1;
        min-width: 0;
        
        .history-timeline {
          position: relative;
          padding-left: 20px;
          
          &:before {
            content: '';
            position: absolute;
            left: 5px;
            top: 8px;
            height: calc(100% - 16px);
            width: 2px;
            background-color: rgba($fuzhou-nature, 0.2);
          }
          
          .timeline-item {
            margin-bottom: 25px;
            position: relative;
            
            &:last-child {
              margin-bottom: 0;
            }
            
            .timeline-dot {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background-color: $fuzhou-nature;
              position: absolute;
              left: -20px;
              top: 8px;
            }
            
            .timeline-content {
              h3 {
                margin: 0 0 8px;
                font-size: 1.1rem;
                color: $fuzhou-nature;
              }
              
              p {
                margin: 0;
                color: $text-secondary;
                line-height: 1.6;
                font-size: 0.95rem;
              }
            }
          }
        }
        
        .culture-quote {
          margin-top: 30px;
          padding: 20px;
          background: rgba($fuzhou-nature, 0.05);
          border-left: 4px solid $fuzhou-nature;
          
          i {
            display: block;
            font-size: 1.1rem;
            margin-bottom: 10px;
            color: $text-primary;
            font-style: italic;
          }
          
          span {
            color: $text-secondary;
            font-size: 0.9rem;
          }
        }
      }
    }
  }
  
  .guide-section {
    .guide-content {
      .tab-content {
        padding: 20px 15px;
        
        h3 {
          margin: 0 0 15px;
          font-size: 1.2rem;
          color: $fuzhou-nature;
        }
        
        h4 {
          margin: 20px 0 10px;
          font-size: 1rem;
          color: $text-primary;
        }
        
        p {
          margin: 0 0 15px;
          line-height: 1.7;
          color: $text-primary;
        }
        
        ul, ol {
          margin: 0;
          padding-left: 20px;
          
          li {
            margin-bottom: 8px;
            color: $text-secondary;
            line-height: 1.6;
            
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
        
        .item-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          margin-top: 20px;
          
          @media (max-width: $breakpoint-sm) {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .item-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px 15px;
            background: rgba($fuzhou-nature, 0.05);
            border-radius: 8px;
            
            .el-icon {
              font-size: 30px;
              color: $fuzhou-nature;
              margin-bottom: 10px;
            }
            
            span {
              font-size: 0.9rem;
              color: $text-secondary;
            }
          }
        }
        
        .tip-text {
          margin-top: 20px;
          font-size: 0.85rem;
          color: $text-secondary;
          font-style: italic;
        }
      }
    }
  }
  
  .packages-section {
    padding: 40px 20px;
    
    h2 {
      text-align: center;
      margin-bottom: 30px;
      font-family: 'ZCOOL QingKe HuangYou', sans-serif;
      color: $text-primary;
      font-size: 1.8rem;
    }
    
    .package-card {
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
      
      .package-price {
        position: absolute;
        top: 15px;
        right: 15px;
        background: $fuzhou-nature;
        color: white;
        padding: 8px 15px;
        border-radius: 20px;
        font-weight: bold;
        
        .amount {
          font-size: 1.2rem;
        }
        
        .unit {
          font-size: 0.8rem;
          margin-left: 2px;
          opacity: 0.9;
        }
      }
      
      .card-content {
        padding: 20px;
        
        h3 {
          margin: 0 0 10px;
          font-size: 1.2rem;
          color: $text-primary;
        }
        
        p {
          margin: 0 0 15px;
          color: $text-secondary;
          font-size: 0.95rem;
        }
        
        .package-features {
          margin-bottom: 20px;
          
          .feature {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            
            .el-icon {
              color: $fuzhou-nature;
              margin-right: 8px;
            }
            
            span {
              color: $text-secondary;
              font-size: 0.95rem;
            }
          }
        }
        
        .book-btn {
          width: 100%;
          margin-top: 10px;
          background-color: white;
          color: $fuzhou-nature;
          border-color: $fuzhou-nature;
          
          &:hover {
            background-color: $fuzhou-nature;
            color: white;
          }
        }
      }
    }
  }
}
</style>