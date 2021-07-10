import { css } from '@linaria/core';
import { BLACK_ALFA, BLUE_GREY, COLOR, GREEN, GREY, PURPLE, WHITE_ALFA } from './vars';

export const COLOR_DEFAULT_MAP = `
 ${GREY[0]}: #ffffff;
 ${GREY[50]}: #f2f2f2;
 ${GREY[100]}: #e6e6e6;
 ${GREY[150]}: #d9d9d9;
 ${GREY[200]}: #cccccc;
 ${GREY[250]}: #bfbfbf;
 ${GREY[300]}: #b2b2b2;
 ${GREY[350]}: #a6a6a6;
 ${GREY[400]}: #999999;
 ${GREY[450]}: #8c8c8c;
 ${GREY[500]}: #808080;
 ${GREY[550]}: #737373;
 ${GREY[600]}: #666666;
 ${GREY[650]}: #595959;
 ${GREY[700]}: #4d4d4d;
 ${GREY[750]}: #404040;
 ${GREY[800]}: #333333;
 ${GREY[850]}: #262626;
 ${GREY[900]}: #1a1a1a;
 ${GREY[1000]}: #000000;

 ${PURPLE[10]}: #eeeeff;
 ${PURPLE[25]}: #d5d5d5;
 ${PURPLE[50]}: #aaabfd;
 ${PURPLE[100]}: #5558fa;
 ${PURPLE[115]}: #484bd5;
 ${PURPLE[125]}: #4042bc;
 ${PURPLE[150]}: #282c7d;

 ${GREEN[10]}: #e6fdf5;
 ${GREEN[25]}: #c1f9e5;
 ${GREEN[50]}: #83f4cb;
 ${GREEN[100]}: #07e897;
 ${GREEN[115]}: #06d58b;
 ${GREEN[125]}: #06c37f;
 ${GREEN[150]}: #03734b;

 ${BLACK_ALFA[48]}: rgba(0, 0, 0, 0.48);
 ${BLACK_ALFA[24]}: rgba(0, 0, 0, 0.24);
 ${BLACK_ALFA[16]}: rgba(0, 0, 0, 0.16);
 ${BLACK_ALFA[8]}: rgba(0, 0, 0, 0.08);

 ${WHITE_ALFA[48]}: rgba(255, 255, 255, 0.48);
 ${WHITE_ALFA[24]}: rgba(255, 255, 255, 0.24);
 ${WHITE_ALFA[16]}: rgba(255, 255, 255, 0.16);
 ${WHITE_ALFA[8]}: rgba(255, 255, 255, 0.08);

 ${BLUE_GREY[40]}: #a6a9ac;
 ${BLUE_GREY[50]}: #909497;
 ${BLUE_GREY[60]}: #7a7e83;
 ${BLUE_GREY[70]}: #63696e;
 ${BLUE_GREY[80]}: #4d5359;
 ${BLUE_GREY[90]}: #373e45;
 ${BLUE_GREY[100]}: #212830;

 ${COLOR.GREEN_LIGHT}: #d7e7e2;
 ${COLOR.GREEN_DARK}: #527771;
 ${COLOR.YELLOW_LIGHT}: #f9eed8;
 ${COLOR.YELLOW_DARK}: #9e9056;
 ${COLOR.SILVER_GRAY_LIGHT}: #d7d7d6;
 ${COLOR.SILVER_GRAY_DARK}: #6c6f71;
 ${COLOR.CHARCOAL_GRAY_LIGHT}: #e6e6e5;
 ${COLOR.CHARCOAL_GRAY_DARK}: #515558;
 ${COLOR.ORANGE_LIGHT}: #fae1d5;
 ${COLOR.ORANGE_DARK}: #9a754f;
 ${COLOR.RED_LIGHT}: #f8d6d5;
 ${COLOR.RED_DARK}: #98605b;
 ${COLOR.PINK_LIGHT}: #f5d5e5;
 ${COLOR.PINK_DARK}: #8a5273;
 ${COLOR.VIOLET_LIGHT}: #d7d7f7;
 ${COLOR.VIOLET_DARK}: #6a588c;
 ${COLOR.BLUE_LIGHT}: #FBD6D5;
 ${COLOR.BLUE_DARK}: #517086;
 ${COLOR.BROWN_LIGHT}: #e6d6d0;
 ${COLOR.BROWN_DARK}: #517086;
 ${COLOR.GRASS_LIGHT}: #ecedcd;
 ${COLOR.GRASS_DARK}: #6d784e;
 ${COLOR.SEAMOUNT_LIGHT}: #e0f4f4;
 ${COLOR.SEAMOUNT_DARK}: #146c6c;

 ${COLOR.SUNNY_YELLOW}: #f0d559;
 ${COLOR.EMERALD_GREEN}: #05ae71;
 ${COLOR.BERRY_RED_1}: #e84e58;
 ${COLOR.BERRY_RED_2}: #ea6069;
 ${COLOR.BERRY_RED_3}: #d1464f;

 ${COLOR.CHARTS_1}: #02e497;
 ${COLOR.CHARTS_1_ALPHA}: rgba(2, 228, 151, 0.1);
 ${COLOR.CHARTS_2}: #0dc8a2;
 ${COLOR.CHARTS_2_ALPHA}: rgba(13, 200, 162, 0.1);
 ${COLOR.CHARTS_3}: #19abac;
 ${COLOR.CHARTS_3_ALPHA}: rgba(25, 171, 172, 0.1);
 ${COLOR.CHARTS_4}: #229485;
 ${COLOR.CHARTS_4_ALPHA}: rgba(34, 148, 181, 0.1);
 ${COLOR.CHARTS_5}: #2883bb;
 ${COLOR.CHARTS_5_ALPHA}: rgba(40, 131, 187, 0.1);
 ${COLOR.CHARTS_6}: #316cc4;
 ${COLOR.CHARTS_6_ALPHA}: rgba(49, 108, 196, 0.1);
 ${COLOR.CHARTS_7}: #3a56cc;
 ${COLOR.CHARTS_7_ALPHA}: rgba(58, 86, 204, 0.1);
 ${COLOR.CHARTS_8}: #5c00ec;
 ${COLOR.CHARTS_8_ALPHA}: rgba(92, 0, 236, 0.1);
 ${COLOR.CHARTS_9}: #7818cf;
 ${COLOR.CHARTS_9_ALPHA}: rgba(120, 24, 207, 0.1);
 ${COLOR.CHARTS_10}: #8828bb;
 ${COLOR.CHARTS_10_ALPHA}: rgba(139, 40, 187, 0.1);
 ${COLOR.CHARTS_11}: #9933ad;
 ${COLOR.CHARTS_11_ALPHA}: rgba(153, 51, 173, 0.1);
 ${COLOR.CHARTS_12}: #a53da0;
 ${COLOR.CHARTS_12_ALPHA}: rgba(165, 61, 160, 0.1);
 ${COLOR.CHARTS_13}: #ae4597;
 ${COLOR.CHARTS_13_ALPHA}: rgba(174, 69, 151, 0.1);
 ${COLOR.CHARTS_14}: #bc5191;
 ${COLOR.CHARTS_14_ALPHA}: rgba(188, 81, 145, 0.1);
 ${COLOR.CHARTS_15}: #cc5693;
 ${COLOR.CHARTS_15_ALPHA}: rgba(204, 86, 147, 0.1);
 ${COLOR.CHARTS_16}: #e05a9f;
 ${COLOR.CHARTS_16_ALPHA}: rgba(224, 90, 159, 0.1);

 ${COLOR.GRADIENT_1}: linear-gradient(90deg, #BC5188 0%, #496DEB 29.17%, #0AE59A 100%);
 ${COLOR.GRADIENT_2}: linear-gradient(90deg, #0AE59A 0%, #316CC4 100%);
 ${COLOR.GRADIENT_3}: linear-gradient(180deg, rgba(85, 88, 250, 0.3) 0%, rgba(85, 88, 250, 0) 100%);
 ${COLOR.GRADIENT_4}: linear-gradient(180deg, rgba(2, 228, 151, 0.3) 0%, rgba(2, 228, 151, 0) 100%);
`;

export const defaultColor = css`
  :global() {
    html {
      ${COLOR_DEFAULT_MAP}
    }
  }
`;
