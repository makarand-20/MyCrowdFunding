import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components/';
import { useStateContext } from '../context';
import { checkIfImage } from '../utils';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { createCampaign } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const handleFormFieldEventChange = (name, e) => {
    setForm((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const addCampaign = async (valid) => {
    if (!valid) {
      alert('Pleade enter a valid image url');
      return;
    }
    setIsLoading(true);
    const status = await createCampaign(form);
    setIsLoading(false);
    if (status.value) {
      console.log('Campaign Created Succesfully');
      navigate('/');
    } else alert(status.data.data.message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkIfImage(form.image, addCampaign);
  };
  return (
    <div className="w-full flex justify-center">
      <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 lg:w-[75%]">
        {isLoading && <Loader isTransaction={true} />}
        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
          <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
            Start A Campaign
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <fieldset
            disabled={isLoading}
            className="w-full mt-[65px] flex flex-col gap-[30px]"
          >
            <div className="flex flex-wrap gap-[40px]">
              <FormField
                labelName="Your Name *"
                placeholder="Tom Cruise"
                inputType="text"
                value={form.name}
                handleChange={(e) => {
                  handleFormFieldEventChange('name', e);
                }}
              />
              <FormField
                labelName="Campaign Title *"
                placeholder="Write a title"
                inputType="text"
                value={form.title}
                handleChange={(e) => {
                  handleFormFieldEventChange('title', e);
                }}
              />
            </div>
            <FormField
              labelName="Story *"
              placeholder="Write your story"
              isTextArea
              inputType="text"
              value={form.story}
              handleChange={(e) => {
                handleFormFieldEventChange('description', e);
              }}
            />
            <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
              <img
                src={money}
                alt="money"
                className="w-[40px] h-[40px] object-contain"
              />
              <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
                You will get 100% of the donated amount
              </h4>
            </div>
            <div className="flex flex-wrap gap-[40px]">
              <FormField
                labelName="Goal *"
                placeholder="ETH 0.50"
                inputType="text"
                value={form.target}
                handleChange={(e) => {
                  handleFormFieldEventChange('target', e);
                }}
              />
              <FormField
                labelName="End Date *"
                placeholder="End Date"
                inputType="date"
                value={form.deadline}
                handleChange={(e) => {
                  handleFormFieldEventChange('deadline', e);
                }}
              />
            </div>
            <FormField
              labelName="Image Url *"
              placeholder="Place Image Url"
              inputType="text"
              value={form.image}
              handleChange={(e) => {
                handleFormFieldEventChange('image', e);
              }}
            />
            <div className="flex justify-center items-center mt-[40px]">
              <CustomButton
                btnType="submit"
                title="Submit new Campaign"
                styles="bg-[#1dc071]"
              />
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;
