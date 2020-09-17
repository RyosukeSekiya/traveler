class ImageUploader < CarrierWave::Uploader::Base
 include CarrierWave::MiniMagick
 process resize_to_limit: [400, 400]
  
  if Rails.env.development?
    storage :file
  elsif Rails.env.test?
    storage :file
  else
    storage :fog
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
  
  def extension_whitelist
    %w(jpeg gif png jpg svg svgz pjpeg jfif jpe)
  end

  def filename
    original_filename if original_filename
  end
end
