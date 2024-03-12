<script setup>
const frontendSkills = [
  'HTML',
  'CSS',
  'SASS',
  'JavaScript (ES5, ES6)',
  'TypeScript',
  'Vue.js (2, 3)',
  'Nuxt.js',
  'Vuex / Pinia',
  'Vue Router',
  'SASS',
  'Pug',
  'React.js',
  'jQuery',
  'WebPack',
  'Vite',
  'Gulp',
];

const webDevsSkills = [
  'Node.js',
  'Express.js',
  'REST API',
  'SQL',
  'GitHub',
  'CI/CD',
  'Docker',
  'PHP',
  'WordPress',
];
</script>

<template>
  <div class="skills-main container-block-main">
    <div class="skills-main__block">
      <h3>{{ $t('skills') }}</h3>
      <p>
        {{ $t('skillsContent') }}
      </p>
    </div>
    <div class="skills-main__block">
      <h4>Frontend</h4>
      <p>
        <span v-for="(skill, index) in frontendSkills" :key="index">
          <i>{{ skill }}</i>
        </span>
        <span
          ><i>{{ $t('skillsCross') }}</i></span
        >
      </p>
    </div>
    <div class="skills-main__block">
      <h4>Web development</h4>
      <p>
        <span v-for="(skill, index) in webDevsSkills" :key="index">
          <i>{{ skill }}</i>
        </span>
        <span
          ><i>{{ $t('skillsOOP') }}</i></span
        >
      </p>
    </div>
    <div class="skills-main__block">
      <h4>{{ $t('skillsDesignHeader') }}</h4>
      <p>
        <span
          v-for="(skill, index) in $t('skillsDesign').split(',')"
          :key="index"
        >
          <i>{{ skill }}</i>
        </span>
      </p>
    </div>
    <div class="skills-main__block">
      <h4>{{ $t('skillsAnotherHeader') }}</h4>
      <p>
        <span
          v-for="(skill, index) in $t('skillsAnother').split(',')"
          :key="index"
        >
          <i>{{ skill }}</i>
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.skills-main {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 5px;

  &__block {
    background: $background-skills;
    padding: 30px;
    border-radius: 18px;
    position: relative;

    &:first-child {
      grid-row: 1/3;
    }

    p {
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: start;
      gap: 8px;
      opacity: 0.8;
      font-size: 14px;

      span {
        display: inline-block;
        padding: 2px 10px;
        border: 1px solid $border-color-skills;
        border-radius: 20px;
        font-size: 14px;
        transition: all 0.3s;
        overflow: hidden;
        cursor: pointer;
        background: $background-skills;

        i {
          font-style: normal;
          display: inline-block;
          position: relative;
        }

        &:hover {
          box-shadow: 0 5px 20px $color-shadow-portfolio;
          transform: scale(1.1);

          i {
            animation: animate-text 0.3s linear forwards;
          }

          @keyframes animate-text {
            0% {
              transform: translateY(0);
              opacity: 1;
            }

            48% {
              transform: translateY(-30px);
              opacity: 1;
            }

            49% {
              transform: translateY(-30px);
              opacity: 0;
            }

            50% {
              transform: translateY(30px);
              opacity: 0;
            }

            51% {
              transform: translateY(30px);
              opacity: 1;
            }

            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1300px) {
    grid-template-columns: 1fr 1fr;

    &__block {
      &:first-child {
        grid-row: 1/2;
        grid-column: 1/3;
      }
    }
  }

  @media screen and (max-width: 900px) {
    &__block {
      padding: 25px 15px;

      &:nth-child(2),
      &:nth-child(3) {
        grid-column: 1/3;
      }

      &:nth-child(4),
      &:nth-child(5) {
        p {
          gap: 5px;
          row-gap: 0;

          span {
            padding: 0;
            border: none;
            border-radius: 0;

            &:after {
              content: ',';
            }

            &:last-child {
              &:after {
                display: none;
              }
            }

            &:hover {
              box-shadow: none;
              transform: none;

              i {
                animation: none;
              }
            }
          }
        }
      }

      p {
        gap: 6px;

        span {
          font-size: 13px;
          padding: 2px 10px;
        }
      }
    }
  }
}
</style>
