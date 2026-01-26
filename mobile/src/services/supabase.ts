import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import * as FileSystem from 'expo-file-system/legacy';
import { decode } from 'base64-arraybuffer';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Debug checks
console.log('Supabase Config Check:', {
    url: supabaseUrl ? 'Present' : 'Missing',
    key: supabaseAnonKey ? 'Present' : 'Missing'
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

export const uploadImage = async (uri: string, bucket: string = 'images'): Promise<string | null> => {
    try {
        console.log(`[Upload] Starting upload for ${uri} to bucket ${bucket}`);

        const fileInfo = await FileSystem.getInfoAsync(uri);
        console.log('[Upload] File info:', fileInfo);

        if (!fileInfo.exists) {
            console.error('[Upload] File does not exist at path');
            return null;
        }

        console.log('[Upload] Reading file as base64...');
        const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: 'base64',
        });
        console.log(`[Upload] Read success. Base64 length: ${base64.length}`);

        // Generate a unique file name
        const ext = uri.split('.').pop()?.toLowerCase() || 'jpg';
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
        const filePath = `${fileName}`;
        const contentType = `image/${ext === 'png' ? 'png' : 'jpeg'}`;

        console.log(`[Upload] Uploading to path: ${filePath}, Content-Type: ${contentType}`);

        const arrayBuffer = decode(base64);
        console.log(`[Upload] Decoded ArrayBuffer byteLength: ${arrayBuffer.byteLength}`);

        const { data, error } = await supabase
            .storage
            .from(bucket)
            .upload(filePath, arrayBuffer, {
                contentType,
                upsert: false,
            });

        if (error) {
            console.error('[Upload] Supabase upload error OBJECT:', JSON.stringify(error, null, 2));
            console.error('[Upload] Supabase upload error MESSAGE:', error.message);
            throw error;
        }

        console.log('[Upload] Upload successful, data:', data);

        const { data: { publicUrl } } = supabase
            .storage
            .from(bucket)
            .getPublicUrl(filePath);

        console.log('[Upload] Final Public URL:', publicUrl);
        return publicUrl;
    } catch (error: any) {
        console.error('[Upload] Catch Error:', error);
        console.error('[Upload] Catch Error Stack:', error.stack);
        return null;
    }
};
