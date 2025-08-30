#!/bin/bash

echo "🚀 Breathship Website Deployment Script"
echo "========================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Vercel CLI"
        echo "You can deploy manually by:"
        echo "1. Going to vercel.com"
        echo "2. Connecting your GitHub repository"
        echo "3. Deploying automatically"
        exit 1
    fi
fi

echo "✅ Vercel CLI is installed"

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

if [ $? -ne 0 ]; then
    echo "❌ Deployment failed"
    echo "You can deploy manually by:"
    echo "1. Going to vercel.com"
    echo "2. Connecting your GitHub repository"
    echo "3. Deploying automatically"
    exit 1
fi

echo "🎉 Deployment completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Visit your live website"
echo "2. Go to /myadmin to access the admin panel"
echo "3. Login with password: 1234"
echo "4. Edit your content as needed"
echo "5. Export content for backup"
echo ""
echo "🔧 Admin Panel Features:"
echo "- Edit all website content"
echo "- Real-time updates"
echo "- Export/Import content"
echo "- Reset to default content"
echo ""
echo "🌐 Your website is now live and fully functional!"
