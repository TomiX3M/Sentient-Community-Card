import sentientImage from './assets/sentient.png';
import builderImage from './assets/builder.png';
import educatorImage from './assets/educator.png';
import helperImage from './assets/helper.png';
import artistImage from './assets/artist.png';
import sentientText from './assets/sentient_text.png';

const getAgiGradient = (agiLevel) => {
  const gradients = {
    'Early AGI': 'bg-gradient-to-r from-green-400 to-emerald-600',
    'Advanced AGI': 'bg-gradient-to-r from-purple-400 to-indigo-600',
    'Sentient AGI': 'bg-gradient-to-r from-yellow-300 to-amber-500',
    'Level 1': 'bg-gradient-to-r from-gray-200 to-white',
    'Level 2': 'bg-gradient-to-r from-gray-300 via-white to-gray-200',
    'Level 3': 'bg-gradient-to-r from-gray-400 via-white to-gray-300',
  };
  return gradients[agiLevel] || 'bg-gradient-to-r from-gray-400 to-gray-600';
};

const getAgiLevel = (roleLevel) => {
  const agiLevels = [
    'Level 1',
    'Level 2',
    'Level 3',
    'Early AGI',
    'Advanced AGI',
    'Sentient AGI'
  ];

  
  // If role is in the list, return it, otherwise return the default
  return agiLevels.includes(roleLevel) ? roleLevel : 'Sentient AGI';
};

// const getTrackLevel = (track) => {
//   const tracks = [
//     'Builder',
//     'Educator',
//     'Helper',
//     'Artist'
//   ];

//   return tracks.includes(track) ? track : 'Builder';
// };
  

const getRoleImage = (role) => {
  const roleImages = {
    'builder': builderImage,
    'educator': educatorImage,
    'helper': helperImage,
    'artist': artistImage
  };
  return roleImages[role?.toLowerCase()] || builderImage; // Default to builder image
};

const getRoleDescription = (role) => {
  const descriptions = {
    'builder': 'Building the future of decentralized technology',
    'educator': 'Educating the next generation of Web3 innovators',
    'artist': 'Creating immersive experiences through digital art'
  };
  return descriptions[role?.toLowerCase()] || 'Contributing to the future of AGI';
};

export default function NeonCard({ name, imageUrl, roleLevel = 'Level 1', track = 'Builder' }) {
  const agiLevel = getAgiLevel(roleLevel);
  const roleImage = getRoleImage(track.toLowerCase());
 
  const roleDescription = getRoleDescription(track.toLowerCase());
  
  return (
    <div
      className="relative w-[350px] h-[500px] p-[12px] rounded-3xl
                 bg-[repeating-linear-gradient(135deg,#f472b6_0%,#d946ef_20%,#be123c_40%,#f472b6_60%)]
                 shadow-[0_0_50px_rgba(236,72,153,0.6),0_0_90px_rgba(217,70,239,0.5),0_0_150px_rgba(190,18,60,0.4)]"
    >
      {/* Inner gradient layer */}
      <div className="h-full w-full rounded-2x1 bg-gradient-to-t from-black via-pink-700  to-black
      animate-gradient-vert 
      p-4 rounded-xl shadow-lg pt-4 pb-6 px-6 text-white">
        <div className="relative mb-4">
          <div className="relative z-10 flex items-center justify-between gap-3 text-left text-xl font-semibold text-white px-4 py-3">
            {name}
            <img
              src={sentientImage}
              alt="verified"
              className="w-7 h-7 rounded-full"
            />
          </div>
          {/* Gradient border container */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 p-[1px]">
            <div className="h-full w-full rounded-lg bg-gradient-to-r from-fuchsia-700/70 via-black/90 to-black/90 p-2">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500/10 via-transparent to-pink-500/5 pointer-events-none" />
            </div>
          </div>
        </div>
        <div className="relative p-[3px] h-[250px] w-[250px] mx-auto rounded-lg bg-gradient-to-br from-pink-500 via-fuchsia-500 to-rose-300 ">

          <img
            src={imageUrl}
            alt="profile"
            className=" aspect-square object-cover rounded-1xl border-4 border-transparent"
          />

        </div>
      
        <div className="flex items-center gap-4 p-2 shadow-lg w-fit -ml-2 mt-3">
          <div className="flex items-center justify-center  bg-gradient-to-tl from-rose-400 via-pink-700 to-rose-400 rounded-lg w-15 h-15">

            <div className='w-16 h-16 flex items-center justify-center'>
              <img 
                src={roleImage} 
                alt={roleLevel} 
                className="w-12 h-12 object-contain" 
              />
            </div>


          </div>
          <div>
            <h2 className="text-white font-bold text-lg">
              <span className="inline-flex items-center">
                {track} {' - '}
                <span className={`${getAgiGradient(agiLevel)} bg-clip-text text-transparent`}>
                  {agiLevel}
                </span>
              </span>
            </h2>
            <p className="text-gray-300 text-sm w-[200px] break-words">
              {roleDescription}
            </p>
          </div>

        </div>

      </div>
      {/* Centered logo at bottom */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
        <div className="w-20 h-12 flex items-center justify-center">
          <img src={sentientText} alt="Sentient" className="h-full w-auto object-contain" />
        </div>
      </div>
    </div>
  );
}