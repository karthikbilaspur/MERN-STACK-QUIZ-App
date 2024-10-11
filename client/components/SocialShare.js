// components/SocialShare.js
import React from 'react';

const SocialShare = () => {
  const handleShare = (platform) => {
    const url = 'https://example.com';
    const text = 'Check out this quiz!';

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/share?url=${url}&text=${text}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Share on social media!</h1>
      <button onClick={() => handleShare('twitter')}>Twitter</button>
      <button onClick={() => handleShare('facebook')}>Facebook</button>
    </div>
  );
};

export default SocialShare;