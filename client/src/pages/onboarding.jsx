import React, { useEffect, useState } from 'react';
import Avatar from '../components/common/Avatar';
import Input from '../components/common/Input';
import axios from 'axios';
import { ON_BOARD_USER_ROUTE } from '../utils/ApiRoutes';

import Resizer from 'react-image-file-resizer';

import Image from 'next/image';
import { useStateProvider } from '@/context/StateContext';
import { useRouter } from 'next/router';
import { reducerCases } from '@/context/constants';

const OnBoarding = () => {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const [name, setName] = useState(userInfo?.name || '');
  const [about, setAbout] = useState('');
  const [image, setImage] = useState('/default_avatar.png');

  const router = useRouter();

  const onBoardUser = async () => {
    if (validateDetails()) {
      const email = userInfo?.email;
      try {
        const resizedImage = await getResizedImage(image);
        await onboardNewUser(email, name, about, resizedImage);
        dispatchUserDetailsAndRedirect(name, email, resizedImage, about);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getResizedImage = async (imageSrc) => {
    const base64Response = await fetch(`${imageSrc}`);
    const blob = await base64Response.blob();
    const resizedImage = await resizeFile(blob);
    setImage(resizedImage);
    return resizedImage;
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        'PNG',
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        'base64'
      );
    });

  const onboardNewUser = async (email, name, about, image) => {
    const { data } = await axios.post(ON_BOARD_USER_ROUTE, {
      email,
      name,
      about,
      image,
    });
    if (!data.status) {
      throw new Error('Failed to onboard new user.');
    }
    return data;
  };

  const dispatchUserDetailsAndRedirect = (name, email, image, about) => {
    dispatch({ type: reducerCases.SET_NEW_USER, newUser: false });
    dispatch({
      type: reducerCases.SET_USER_INFO,
      userInfo: {
        name,
        email,
        profileImage: image,
        status: about,
      },
    });
    router.push('/');
  };

  const validateDetails = () => {
    if (name.length > 3) {
      return true;
    }
    return false;
  };

  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <Image
          src="/whatsapp.gif"
          alt="whatsapp-gif"
          height={300}
          width={300}
        />
        <span className="text-7xl">WhatsApp</span>
      </div>
      <div></div>
      <h2 className="text-2xl ">Create your profile</h2>
      <div className="flex gap-6 mt-6 ">
        <div className="flex flex-col items-center justify-between mt-5 gap-6">
          <Input name="Display Name" state={name} setState={setName} label />
          <Input name="About" state={about} setState={setAbout} label />
          <div className="flex items-center justify-center">
            <button
              className="bg-search-input-container-background p-5 rounded-lg"
              onClick={onBoardUser}
            >
              Create Profile
            </button>
          </div>
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
};
export default OnBoarding;
