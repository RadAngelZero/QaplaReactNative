import Images from './../../assets/images';

const svgImages = Images.svg;
const pngImages = Images.png;
const overwatchIcon = svgImages.overwatchIcon;
const fifaIcon = svgImages.fifaIcon;

export const gamesResources = {
    pc_white: {
        aClash: {
            icon: svgImages.clashIcon,
            image: pngImages.clashPC.img
        },
        pHearth: {
            icon: svgImages.heartstoneIcon,
            image: pngImages.heartstonePC.img
        },
        pOver: {
            icon: overwatchIcon,
            image: pngImages.overwatchPC.img
        },
        pcLol: {
            icon: svgImages.lolIcon,
            image: pngImages.lolPC.img
        }
    },
    ps4_white: {
        psFifa: {
            icon: fifaIcon,
            image: pngImages.fifaPS.img
        },
        psOver: {
            icon: overwatchIcon,
            image: pngImages.overwatchPS.img
        }
    },
    switch_white: {
        swSmash: {
            icon: svgImages.smashIcon,
            image: pngImages.smashSW.img
        }
    },
    xbox_white: {
        xFifa: {
            icon: fifaIcon,
            image: pngImages.fifaXbox.img
        },
        xGears: {
            icon: svgImages.gowIcon,
            image: pngImages.GOWXbox.img
        },
        xHalo: {
            icon: svgImages.haloIcon,
            image: pngImages.HALOXbox.img
        },
        xOver: {
            icon: overwatchIcon,
            image: pngImages.overwatchXbox.img
        }
    }
};